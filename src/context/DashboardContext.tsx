import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  JointId,
  DemoMode,
  JointData,
  Alert,
  NavTab,
  ConveyorMetrics,
  RiskLevel
} from '../types';
import { BASE_JOINTS_DATA } from '../data/joints';
import { BASE_ALERTS } from '../data/alerts';
import { TimeFilter } from '../data/trends';
import { DEMO_SCENARIO_STEPS } from '../data/scenarios';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
}

interface DashboardContextType {
  // Navigation & View State
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  
  // Joint Selection & Demo Mode
  selectedJointId: JointId;
  setSelectedJointId: (id: JointId) => void;
  demoMode: DemoMode;
  setDemoMode: (mode: DemoMode) => void;
  
  // Live Data
  currentJoint: JointData;
  allJoints: Record<JointId, JointData>;
  conveyorMetrics: ConveyorMetrics;
  
  // Sensor Trend Controls
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  
  // Alerts System
  alerts: Alert[];
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  acknowledgeAllAlerts: () => void;
  
  // Demo Scenario Walkthrough
  scenarioGuideOpen: boolean;
  setScenarioGuideOpen: (open: boolean) => void;
  currentScenarioStep: number;
  goToScenarioStep: (stepNumber: number) => void;
  nextScenarioStep: () => void;
  prevScenarioStep: () => void;
  
  // Work Order Modal
  workOrderModalOpen: boolean;
  setWorkOrderModalOpen: (open: boolean) => void;
  createWorkOrder: (jointId: JointId, priority: string, notes: string) => void;
  
  // System Telemetry Clock & Toasts
  systemTime: string;
  systemRunning: boolean;
  setSystemRunning: (running: boolean) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [demoMode, setDemoModeState] = useState<DemoMode>('WARNING');
  const [selectedJointId, setSelectedJointId] = useState<JointId>('J-03');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1H');
  
  const [alerts, setAlerts] = useState<Alert[]>(BASE_ALERTS['WARNING']);
  const [workOrderModalOpen, setWorkOrderModalOpen] = useState<boolean>(false);
  const [scenarioGuideOpen, setScenarioGuideOpen] = useState<boolean>(false);
  const [currentScenarioStep, setCurrentScenarioStep] = useState<number>(1);
  const [systemRunning, setSystemRunning] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [systemTime, setSystemTime] = useState<string>(
    new Date().toLocaleTimeString('en-GB', { hour12: false })
  );

  // Live SCADA clock
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update alerts when demoMode changes
  const setDemoMode = (mode: DemoMode) => {
    setDemoModeState(mode);
    setAlerts(BASE_ALERTS[mode]);
    
    // Auto-focus the most relevant joint for that mode if needed
    if (mode === 'CRITICAL') {
      setSelectedJointId('J-05');
    } else if (mode === 'WARNING') {
      setSelectedJointId('J-03');
    } else {
      setSelectedJointId('J-01');
    }

    addToast({
      type: mode === 'CRITICAL' ? 'error' : mode === 'WARNING' ? 'warning' : 'success',
      title: `DEMO CONDITION: ${mode}`,
      message: mode === 'CRITICAL'
        ? 'Critical rupture thresholds active on J-05. Sensor anomalies surging.'
        : mode === 'WARNING'
        ? 'Controlled warning condition active on J-03. Elevated vibration & current.'
        : 'Nominal conveyor baseline restored across all 5 joints.'
    });
  };

  const addToast = (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const newToast: ToastMessage = {
      ...toast,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false })
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const allJoints = useMemo(() => {
    return BASE_JOINTS_DATA[demoMode];
  }, [demoMode]);

  const currentJoint = useMemo(() => {
    return allJoints[selectedJointId] || allJoints['J-03'];
  }, [allJoints, selectedJointId]);

  // Dynamic Overall Metrics
  const conveyorMetrics = useMemo<ConveyorMetrics>(() => {
    const activeAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;
    
    let overallHealth = 72;
    let currentRisk: RiskLevel = 'MEDIUM';
    let beltSpeed = 2.8;
    let lineStatus: ConveyorMetrics['lineStatus'] = 'RUNNING';
    let totalTonnageTph = 2450;
    let motorPowerKw = 480;

    if (demoMode === 'NORMAL') {
      overallHealth = 92;
      currentRisk = 'LOW';
      beltSpeed = 2.8;
      lineStatus = 'RUNNING';
      totalTonnageTph = 2600;
      motorPowerKw = 450;
    } else if (demoMode === 'WARNING') {
      overallHealth = 72;
      currentRisk = 'MEDIUM';
      beltSpeed = 2.8;
      lineStatus = 'DEGRADED';
      totalTonnageTph = 2450;
      motorPowerKw = 510;
    } else if (demoMode === 'CRITICAL') {
      overallHealth = 38;
      currentRisk = 'CRITICAL';
      beltSpeed = 2.5;
      lineStatus = 'MAINTENANCE_REQUIRED';
      totalTonnageTph = 1800;
      motorPowerKw = 620;
    }

    return {
      overallHealth,
      currentRisk,
      beltSpeed,
      activeAlertsCount,
      lineStatus,
      totalTonnageTph,
      motorPowerKw
    };
  }, [demoMode, alerts]);

  // Alert Actions
  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a))
    );
    addToast({
      type: 'info',
      title: 'Alert Acknowledged',
      message: `Alarm ${alertId} operator acknowledgement logged into SCADA event record.`
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
    );
    addToast({
      type: 'success',
      title: 'Alert Resolved',
      message: `Alarm ${alertId} marked as resolved.`
    });
  };

  const acknowledgeAllAlerts = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, status: 'ACKNOWLEDGED' })));
    addToast({
      type: 'info',
      title: 'Batch Acknowledge',
      message: 'All active alarms acknowledged by operator console.'
    });
  };

  // Scenario Walkthrough Steps
  const goToScenarioStep = (stepNumber: number) => {
    const stepData = DEMO_SCENARIO_STEPS.find((s) => s.step === stepNumber);
    if (!stepData) return;
    setCurrentScenarioStep(stepNumber);
    setDemoModeState(stepData.targetMode);
    setSelectedJointId(stepData.targetJoint);
    setAlerts(BASE_ALERTS[stepData.targetMode]);
    setActiveTab('overview');
  };

  const nextScenarioStep = () => {
    if (currentScenarioStep < DEMO_SCENARIO_STEPS.length) {
      goToScenarioStep(currentScenarioStep + 1);
    }
  };

  const prevScenarioStep = () => {
    if (currentScenarioStep > 1) {
      goToScenarioStep(currentScenarioStep - 1);
    }
  };

  const createWorkOrder = (jointId: JointId, priority: string, notes: string) => {
    const woNum = `WO-${Math.floor(1000 + Math.random() * 9000)}`;
    addToast({
      type: 'success',
      title: `Work Order Dispatched (${woNum})`,
      message: `Inspection ticket logged for Joint ${jointId} with priority [${priority.toUpperCase()}].`
    });
    setWorkOrderModalOpen(false);
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedJointId,
        setSelectedJointId,
        demoMode,
        setDemoMode,
        currentJoint,
        allJoints,
        conveyorMetrics,
        timeFilter,
        setTimeFilter,
        alerts,
        acknowledgeAlert,
        resolveAlert,
        acknowledgeAllAlerts,
        scenarioGuideOpen,
        setScenarioGuideOpen,
        currentScenarioStep,
        goToScenarioStep,
        nextScenarioStep,
        prevScenarioStep,
        workOrderModalOpen,
        setWorkOrderModalOpen,
        createWorkOrder,
        systemTime,
        systemRunning,
        setSystemRunning,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
