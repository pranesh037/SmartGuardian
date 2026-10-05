import React from 'react';
import { useApp } from '../context/AppContext';
import CaregiverAlert from '../components/Emergency/CaregiverAlert';
import EmergencyHistory from '../components/Emergency/EmergencyHistory';
import { AlertTriangle, ShieldCheck, PhoneCall, Radio, Clock, Zap } from 'lucide-react';

const Emergency = () => {
  const { emergencyStatus, triggerPossibleEmergency, settings } = useApp();

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
            Emergency Detection & Response System
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Multi-sensor fall & SOS monitoring engine with {settings.emergencyCountdownSeconds}-second caregiver verification countdown.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => triggerPossibleEmergency('Fall Detected (MPU6050)')}
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
            }}
          >
            <AlertTriangle size={18} />
            <span>Simulate Fall Detection</span>
          </button>

          <button 
            onClick={() => triggerPossibleEmergency('Manual SOS Button Pressed')}
            style={{
              background: '#b91c1c',
              color: 'white',
              border: '1px solid #f87171',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertTriangle size={18} />
            <span>Simulate SOS</span>
          </button>
        </div>
      </div>

      <CaregiverAlert />

      {/* Emergency Detection Logic Cards */}
      <div className="sg-card" style={{ marginBottom: '24px' }}>
        <div className="sg-card-title">
          <span>Multi-Sensor Emergency Trigger Logic</span>
          <span className="badge working">Monitoring Active</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, marginBottom: '6px' }}>
              <Zap size={16} />
              <span>1. Fall Detection</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
              Triggered by MPU6050 6-axis accelerometer & gyroscope impact vector thresholds.
            </p>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
              <Clock size={16} />
              <span>2. Inactivity Alarm</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
              Detects prolonged lack of movement during wake hours.
            </p>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontWeight: 700, marginBottom: '6px' }}>
              <Radio size={16} />
              <span>3. Abnormal Vitals</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
              MAX30102 flags HR &gt; 120 BPM, HR &lt; 50 BPM, or SpO2 &lt; 90%.
            </p>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontWeight: 700, marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>4. Physical SOS Button</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
              Immediate tactile button press on Smart Cuff body.
            </p>
          </div>
        </div>
      </div>

      <EmergencyHistory />
    </div>
  );
};

export default Emergency;
