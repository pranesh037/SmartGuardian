import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Wifi, Battery, Bell, User, Radio, AlertTriangle, RefreshCw } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

const Header = () => {
  const { 
    healthData, 
    emergencyStatus, 
    notifications, 
    elderProfile,
    syncDeviceHardware 
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-icon">
          <Shield size={22} />
        </div>
        <div>
          <h1>SMARTGUARDIAN</h1>
        </div>
        <span className="project-tag">Design Thinking Prototype</span>
      </div>

      <div className="header-status-group">
        {/* Connection Badge */}
        <div className={`status-badge ${healthData.connected ? 'connected' : 'disconnected'}`}>
          <Wifi size={14} />
          <span>{healthData.connected ? 'ESP32 ONLINE' : 'DISCONNECTED'}</span>
        </div>

        {/* Emergency Status Badge */}
        <div className={`status-badge ${emergencyStatus === 'SAFE' ? 'connected' : 'emergency'}`}>
          <Radio size={14} />
          <span>STATUS: {emergencyStatus}</span>
        </div>

        {/* Battery Indicator */}
        <div className="battery-indicator" title="Smart Cuff Rechargeable Battery">
          <Battery size={16} color={healthData.battery > 20 ? '#10b981' : '#ef4444'} />
          <span>{healthData.battery}%</span>
        </div>

        {/* Manual Sync Button */}
        <button 
          className="notification-btn" 
          onClick={syncDeviceHardware}
          title="Synchronize ESP32 Telemetry"
        >
          <RefreshCw size={18} />
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            className="notification-btn" 
            onClick={() => setNotifOpen(!notifOpen)}
            title="Notifications Center"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          {notifOpen && (
            <NotificationPanel onClose={() => setNotifOpen(false)} />
          )}
        </div>

        {/* Caregiver Profile */}
        <div className="user-profile-summary" title="Caregiver Account">
          <div className="user-avatar">SA</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f3f4f6' }}>
              S. Anitha
            </span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
              Caregiver
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
