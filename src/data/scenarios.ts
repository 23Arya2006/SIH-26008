import { DemoScenarioStep } from '../types';

export const DEMO_SCENARIO_STEPS: DemoScenarioStep[] = [
  {
    step: 1,
    title: 'Normal Operation',
    description: 'Conveyor belt CV-104 running at 2.8 m/s nominal speed. All 5 vulcanized splices show healthy vibration (1.4–1.8 mm/s) and standard thermal envelopes.',
    targetMode: 'NORMAL',
    targetJoint: 'J-01',
    focusArea: 'conveyor'
  },
  {
    step: 2,
    title: 'Controlled Joint Abnormality',
    description: 'Joint J-03 in Section B3 develops early-stage mechanical splice core shear fatigue and micro-dilation.',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'joint'
  },
  {
    step: 3,
    title: 'Sensor Deviation',
    description: 'Piezoelectric vibration sensor detects 4.2 mm/s RMS at 24Hz joint transit frequency. Motor current rises to 31A with a 46°C temperature trend.',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'sensors'
  },
  {
    step: 4,
    title: 'Vision Anomaly',
    description: 'High-speed line-scan camera detects +1.4mm step gap dilation and surface irregularity along splice step 2.',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'vision'
  },
  {
    step: 5,
    title: 'Multimodal Assessment',
    description: 'Fusion reasoning engine cross-correlates optical splice dilation with dynamic vibration spikes to calculate a Health Score of 72 / 100 (Medium Risk).',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'explanation'
  },
  {
    step: 6,
    title: 'Risk Alert',
    description: 'System automatically raises Warning Alert ALT-2001 with precise physical evidence logs and timestamp.',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'alerts'
  },
  {
    step: 7,
    title: 'Maintenance Recommendation',
    description: 'Operator is guided to schedule an inspection during the upcoming planned maintenance window rather than an unscheduled emergency shutdown.',
    targetMode: 'WARNING',
    targetJoint: 'J-03',
    focusArea: 'action'
  }
];
