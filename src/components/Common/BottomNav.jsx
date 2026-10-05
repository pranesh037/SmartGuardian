import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Activity, 
  Pill, 
  MapPin, 
  Cpu, 
  User 
} from 'lucide-react';

const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const mobileItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'medication', label: 'Meds', icon: Pill },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'device', label: 'Device', icon: Cpu },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {mobileItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button 
            key={item.id} 
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
