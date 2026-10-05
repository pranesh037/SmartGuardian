import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Activity, 
  Pill, 
  MapPin, 
  Cpu, 
  User, 
  Settings, 
  SlidersHorizontal 
} from 'lucide-react';

const Sidebar = () => {
  const { activeTab, setActiveTab, setDevPanelOpen, devPanelOpen } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'health', label: 'Health Monitoring', icon: Activity },
    { id: 'medication', label: 'Medication', icon: Pill },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'device', label: 'Device Status', icon: Cpu },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="app-sidebar">
      <div>
        <div className="sidebar-header">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Navigation Menu
          </span>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className={`sidebar-item ${isActive ? 'active' : ''}`}>
                <button onClick={() => setActiveTab(item.id)}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <button 
          className="dev-trigger-btn"
          onClick={() => setDevPanelOpen(!devPanelOpen)}
        >
          <SlidersHorizontal size={16} />
          <span>{devPanelOpen ? 'Close Demo Panel' : 'Hardware Simulator'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
