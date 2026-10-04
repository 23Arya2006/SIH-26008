export type JointId = 'J-01' | 'J-02' | 'J-03' | 'J-04' | 'J-05';

export type DemoMode = 'NORMAL' | 'WARNING' | 'CRITICAL';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SeverityLevel = 'NORMAL' | 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export type SensorStatusType = 'NORMAL' | 'SLIGHTLY ELEVATED' | 'ELEVATED' | 'CRITICAL';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';

export type NavTab = 'overview' | 'joint-health' | 'sensor-analytics' | 'alerts' | 'settings';

export interface SensorMetric {
  type: 'vibration' | 'temperature' | 'current' | 'speed';
  name: string;
  value: number;
  unit: string;
  status: SensorStatusType;
  baseline: string;
  thresholdWarning: number;
  thresholdCritical: number;
  trend: 'STABLE' | 'RISING' | 'VOLATILE' | 'FALLING';
  min: number;
  max: number;
}

export interface MultimodalEvidence {
  visual: string;
  vibration: string;
  current: string;
  temperature: string;
  summary: string;
}

export interface JointDefectMarker {
  hasDefect: boolean;
  type: string;
  confidence: number;
  x: number; // percentage
  y: number; // percentage
  width: number;
  height: number;
  description: string;
}

export interface JointData {
  id: JointId;
  name: string;
  section: 'B1' | 'B2' | 'B3' | 'B4' | 'B5';
  healthScore: number; // 0 - 100
  risk: RiskLevel;
  severity: SeverityLevel;
  condition: string;
  primarySignal: string;
  lastAssessment: string;
  recommendedAction: string;
  actionUrgency: 'ROUTINE' | 'PLANNED' | 'URGENT' | 'IMMEDIATE';
  spliceType: string;
  installedDate: string;
  positionMeters: number;
  sensors: {
    vibration: SensorMetric;
    temperature: SensorMetric;
    current: SensorMetric;
    speed: SensorMetric;
  };
  multimodalEvidence: MultimodalEvidence;
  defectMarker: JointDefectMarker;
  healthHistory: number[]; // e.g. [92, 90, 88, 85, 81, 77, 72]
}

export interface Alert {
  id: string;
  time: string;
  timestamp: string;
  jointId: JointId;
  section: string;
  severity: AlertSeverity;
  signal: string;
  message: string;
  status: AlertStatus;
  recommendedAction: string;
}

export interface SensorTrendPoint {
  time: string;
  timestamp: string;
  vibration: number;
  temperature: number;
  current: number;
  speed: number;
  healthScore: number;
}

export interface ConveyorMetrics {
  overallHealth: number;
  currentRisk: RiskLevel;
  beltSpeed: number;
  activeAlertsCount: number;
  lineStatus: 'RUNNING' | 'DEGRADED' | 'MAINTENANCE_REQUIRED' | 'STOPPED';
  totalTonnageTph: number;
  motorPowerKw: number;
}

export interface DemoScenarioStep {
  step: number;
  title: string;
  description: string;
  targetMode: DemoMode;
  targetJoint: JointId;
  focusArea: string;
}
