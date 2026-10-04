import React from 'react';
import { ConveyorOverview } from '../components/ConveyorOverview';
import { HealthSummary } from '../components/HealthSummary';
import { JointDetail } from '../components/JointDetail';
import { SensorStatus } from '../components/SensorStatus';
import { VisionInspection } from '../components/VisionInspection';
import { SensorTrend } from '../components/SensorTrend';
import { HealthHistory } from '../components/HealthHistory';
import { RiskExplanation } from '../components/RiskExplanation';
import { MaintenanceAction } from '../components/MaintenanceAction';
import { AlertList } from '../components/AlertList';
import { DemoControls } from '../components/DemoControls';
import { DemoScenarioGuide } from '../components/DemoScenarioGuide';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-3 pb-6">
      {/* Interactive Scenario Walkthrough (if open) */}
      <DemoScenarioGuide />

      {/* Demo Condition Quick Selector */}
      <DemoControls />

      {/* 1. Conveyor Overview 2D Engineering Schematic */}
      <ConveyorOverview />

      {/* 2. Operational KPI Strip (Health, Risk, Speed, Alerts) */}
      <HealthSummary />

      {/* 3. Joint Detail + Sensor Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <JointDetail />
        <SensorStatus />
      </div>

      {/* 4. Vision Inspection + Sensor Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <VisionInspection />
        <SensorTrend />
      </div>

      {/* 5. Explainable Risk (Why at risk?) + Joint Health History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <RiskExplanation />
        <HealthHistory />
      </div>

      {/* 6. Recommended Action + Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <MaintenanceAction />
        <AlertList />
      </div>
    </div>
  );
};
