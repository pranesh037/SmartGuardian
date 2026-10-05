import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, Clock, Bell, Radio, Zap, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
  const { settings, setSettings, addNotification } = useApp();

  const handleToggle = (key) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      addNotification('Settings Updated', `${key} toggled ${updated[key] ? 'ON' : 'OFF'}.`, 'info');
      return updated;
    });
  };

  const handleTimerChange = (e) => {
    const val = parseInt(e.target.value);
    setSettings(prev => ({ ...prev, emergencyCountdownSeconds: val }));
    addNotification('Timer Updated', `Emergency countdown set to ${val} seconds.`, 'success');
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
          System Configuration & Parameters
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
          Adjust countdown duration, sensor sensitivity triggers, and caregiver alert channels.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Emergency Countdown Settings */}
        <div className="sg-card">
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="#ef4444" />
              <span>Emergency Confirmation Timer</span>
            </div>
            <span className="badge emergency">{settings.emergencyCountdownSeconds} Seconds</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
            When a possible fall or SOS condition is detected, the Smart Cuff initiates a countdown modal. Select cancellation window:
          </p>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>
              Confirmation Timeout Window:
            </label>
            <select 
              className="sg-select" 
              value={settings.emergencyCountdownSeconds} 
              onChange={handleTimerChange}
            >
              <option value={10}>10 Seconds (Default Standard)</option>
              <option value={20}>20 Seconds (Extended Window)</option>
              <option value={30}>30 Seconds (Maximum Grace Period)</option>
            </select>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="sg-card" style={{ gridColumn: 'span 2' }}>
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SettingsIcon size={20} color="#3b82f6" />
              <span>Feature Toggles & Subsystem Switches</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Fall Detection Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>MPU6050 Fall Detection</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Automated impact vector trigger</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.fallDetection} onChange={() => handleToggle('fallDetection')} />
                <span className="slider"></span>
              </label>
            </div>

            {/* Health Monitoring Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>MAX30102 PPG Monitoring</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Heart rate & SpO2 live stream</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.healthMonitoring} onChange={() => handleToggle('healthMonitoring')} />
                <span className="slider"></span>
              </label>
            </div>

            {/* NFC Verification Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>NFC Container Verification</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Tag ID match before mark taken</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.nfcVerification} onChange={() => handleToggle('nfcVerification')} />
                <span className="slider"></span>
              </label>
            </div>

            {/* Medication Reminder Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>Buzzer/Haptic Reminders</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>On-cuff audio & vibration alerts</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.medicationReminder} onChange={() => handleToggle('medicationReminder')} />
                <span className="slider"></span>
              </label>
            </div>

            {/* GSM Alert Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>SIM800L GSM SMS Alerts</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Cellular emergency SMS text</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.gsmAlerts} onChange={() => handleToggle('gsmAlerts')} />
                <span className="slider"></span>
              </label>
            </div>

            {/* Caregiver Notifications Toggle */}
            <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>Caregiver Push Center</strong>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>In-app push notifications</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.caregiverNotifications} onChange={() => handleToggle('caregiverNotifications')} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
