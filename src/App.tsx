import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Overview } from './pages/Overview';
import { JointHealth } from './pages/JointHealth';
import { SensorAnalytics } from './pages/SensorAnalytics';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { WorkOrderModal } from './components/WorkOrderModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useDashboard();

  return (
    <div className="flex-1 min-w-0 p-3 lg:p-4 overflow-y-auto max-h-[calc(100vh-53px)]">
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'joint-health' && <JointHealth />}
      {activeTab === 'sensor-analytics' && <SensorAnalytics />}
      {activeTab === 'alerts' && <Alerts />}
      {activeTab === 'settings' && <Settings />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#080b11] text-[#e2e8f0] flex flex-col antialiased select-none font-sans">
        {/* Top Header */}
        <Header />

        {/* Workspace Shell: Sidebar + Active Page */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>

        {/* Modals & Live Overlays */}
        <WorkOrderModal />
        <ToastContainer />
      </div>
    </DashboardProvider>
  );
};

export default App;
