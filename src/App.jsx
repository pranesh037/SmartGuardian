import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import BottomNav from './components/Common/BottomNav';
import EmergencyModal from './components/Emergency/EmergencyModal';
import HardwareSimulator from './components/DevPanel/HardwareSimulator';

// Pages
import Dashboard from './pages/Dashboard';
import Emergency from './pages/Emergency';
import Health from './pages/Health';
import Medication from './pages/Medication';
import Location from './pages/Location';
import Device from './pages/Device';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const MainContentRouter = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'emergency': return <Emergency />;
      case 'health': return <Health />;
      case 'medication': return <Medication />;
      case 'location': return <Location />;
      case 'device': return <Device />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <main className="main-content">
      <Header />
      {renderActivePage()}
      <BottomNav />
      <EmergencyModal />
      <HardwareSimulator />
    </main>
  );
};

const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <Sidebar />
        <MainContentRouter />
      </div>
    </AppProvider>
  );
};

export default App;
