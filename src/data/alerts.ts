import { Alert, DemoMode } from '../types';

export const BASE_ALERTS: Record<DemoMode, Alert[]> = {
  NORMAL: [
    {
      id: 'ALT-1001',
      time: '12 min ago',
      timestamp: '14:18:22',
      jointId: 'J-02',
      section: 'B2',
      severity: 'INFO',
      signal: 'Routine Scan',
      message: 'Routine optical and vibration splice health check completed. All parameters nominal.',
      status: 'ACKNOWLEDGED',
      recommendedAction: 'Log in maintenance record. No action required.'
    },
    {
      id: 'ALT-1002',
      time: '45 min ago',
      timestamp: '13:45:10',
      jointId: 'J-04',
      section: 'B4',
      severity: 'INFO',
      signal: 'Calibration',
      message: 'Piezoelectric vibration sensor array zero-point drift auto-calibration successful.',
      status: 'RESOLVED',
      recommendedAction: 'No action required.'
    },
    {
      id: 'ALT-1003',
      time: '1 hr ago',
      timestamp: '13:30:00',
      jointId: 'J-01',
      section: 'B1',
      severity: 'INFO',
      signal: 'Shift Handover',
      message: 'Conveyor CV-104 shift baseline check completed. 5 of 5 joints in Healthy status.',
      status: 'RESOLVED',
      recommendedAction: 'Standard monitoring cycle.'
    }
  ],
  WARNING: [
    {
      id: 'ALT-2001',
      time: '2 min ago',
      timestamp: '14:28:15',
      jointId: 'J-03',
      section: 'B3',
      severity: 'WARNING',
      signal: 'Vibration Spike',
      message: 'Increased vibration detected (4.2 mm/s RMS @ 24Hz joint transit frequency). Step 2 step-gap dilation.',
      status: 'ACTIVE',
      recommendedAction: 'Inspect J-03 during the next planned maintenance window.'
    },
    {
      id: 'ALT-2002',
      time: '5 min ago',
      timestamp: '14:25:02',
      jointId: 'J-03',
      section: 'B3',
      severity: 'WARNING',
      signal: 'Motor Current',
      message: 'Drive motor phase current elevated to 31A during splice traversal over drive drum.',
      status: 'ACTIVE',
      recommendedAction: 'Monitor motor torque variance during high load cycle.'
    },
    {
      id: 'ALT-2003',
      time: '20 min ago',
      timestamp: '14:10:45',
      jointId: 'J-02',
      section: 'B2',
      severity: 'INFO',
      signal: 'Vision Verification',
      message: 'Optical inspection completed for Section B2. Splice face intact.',
      status: 'ACKNOWLEDGED',
      recommendedAction: 'Continue monitoring.'
    },
    {
      id: 'ALT-2004',
      time: '42 min ago',
      timestamp: '13:48:30',
      jointId: 'J-05',
      section: 'B5',
      severity: 'INFO',
      signal: 'Thermal Array',
      message: 'Thermal scan baseline verified across return idler transitions.',
      status: 'RESOLVED',
      recommendedAction: 'No action required.'
    }
  ],
  CRITICAL: [
    {
      id: 'ALT-3001',
      time: '1 min ago',
      timestamp: '14:29:40',
      jointId: 'J-05',
      section: 'B5',
      severity: 'CRITICAL',
      signal: 'Visual + Vibration Anomaly',
      message: 'CRITICAL: Severe transverse cord delamination (8.4 mm/s RMS vibration & cord pull-out detected).',
      status: 'ACTIVE',
      recommendedAction: 'IMMEDIATE CONVEYOR SHUTDOWN & EMERGENCY JOINT REPAIR DISPATCH.'
    },
    {
      id: 'ALT-3002',
      time: '3 min ago',
      timestamp: '14:27:10',
      jointId: 'J-05',
      section: 'B5',
      severity: 'CRITICAL',
      signal: 'Thermal Overheat',
      message: 'Pyrometer array triggered 64°C localized thermal hotspot at drive drum nip point.',
      status: 'ACTIVE',
      recommendedAction: 'Isolate drive motor and halt ore feed hopper.'
    },
    {
      id: 'ALT-3003',
      time: '7 min ago',
      timestamp: '14:23:18',
      jointId: 'J-03',
      section: 'B3',
      severity: 'WARNING',
      signal: 'Vibration & Splice Gap',
      message: 'Splice separation progressing (5.6 mm/s RMS). Accelerated joint fatigue detected.',
      status: 'ACTIVE',
      recommendedAction: 'Priority inspection ticket dispatched.'
    },
    {
      id: 'ALT-3004',
      time: '18 min ago',
      timestamp: '14:12:05',
      jointId: 'J-01',
      section: 'B1',
      severity: 'INFO',
      signal: 'Telemetry Stream',
      message: 'Section B1 tension sensor synchronized with drive inverter.',
      status: 'RESOLVED',
      recommendedAction: 'Standard monitoring.'
    }
  ]
};
