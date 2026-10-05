import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Volume2, Zap, ShieldCheck } from 'lucide-react';

const EmergencyModal = () => {
  const {
    emergencyModalOpen,
    emergencyCause,
    countdownSeconds,
    cancelEmergency,
    healthData,
    settings
  } = useApp();

  const [buzzerActive, setBuzzerActive] = useState(true);
  const [vibrationActive, setVibrationActive] = useState(true);

  if (!emergencyModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="emergency-modal-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}>
            <AlertTriangle size={32} />
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.6rem',
          fontWeight: 800,
          color: '#f87171',
          marginBottom: '4px'
        }}>
          Possible Emergency Detected
        </h2>

        <div style={{
          display: 'inline-block',
          padding: '4px 16px',
          borderRadius: '20px',
          background: 'rgba(239, 68, 68, 0.25)',
          color: '#fca5a5',
          fontSize: '0.9rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          Trigger: {emergencyCause}
        </div>

        {/* Hardware Alarm Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          margin: '12px 0',
          fontSize: '0.8rem',
          color: '#9ca3af'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: buzzerActive ? '#f59e0b' : '#6b7280' }}>
            <Volume2 size={16} className={buzzerActive ? 'animate-pulse' : ''} />
            <span>Simulated Buzzer Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: vibrationActive ? '#f59e0b' : '#6b7280' }}>
            <Zap size={16} />
            <span>Simulated Vibration Active</span>
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', color: '#e5e7eb', fontWeight: 600, marginTop: '8px' }}>
          Are you okay?
        </p>

        {/* Countdown Circle */}
        <div className="countdown-circle">
          {countdownSeconds}
        </div>

        <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '16px' }}>
          If no response within {settings.emergencyCountdownSeconds} seconds, an emergency alert will be dispatched via GSM to caregiver.
        </p>

        <button
          className="safe-btn"
          onClick={cancelEmergency}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={24} />
            <span>I'M SAFE (CANCEL ALERT)</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EmergencyModal;
