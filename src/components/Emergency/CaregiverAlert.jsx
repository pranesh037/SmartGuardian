import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, MapPin, Heart, Activity, PhoneCall, RefreshCw } from 'lucide-react';

const CaregiverAlert = () => {
  const {
    emergencyStatus,
    emergencyCause,
    healthData,
    location,
    elderProfile,
    resetEmergencyState,
    setActiveTab
  } = useApp();

  if (emergencyStatus !== 'EMERGENCY_CONFIRMED') return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))',
      border: '2px solid #ef4444',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 0 35px rgba(239, 68, 68, 0.4)',
      animation: 'pulseRed 2s infinite'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#ef4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fca5a5' }}>
              🚨 EMERGENCY ALERT CONFIRMED
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#fee2e2' }}>
              {emergencyCause} - No response received within countdown period.
            </p>
          </div>
        </div>

        <button
          onClick={resetEmergencyState}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={14} />
          <span>Reset Status</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        marginBottom: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Elder Profile</span>
          <strong style={{ fontSize: '1.05rem', color: 'white' }}>{elderProfile.name} ({elderProfile.age} yrs)</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Heart Rate</span>
          <strong style={{ fontSize: '1.05rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Heart size={16} /> {healthData.heartRate} BPM
          </strong>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>SpO2 Level</span>
          <strong style={{ fontSize: '1.05rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={16} /> {healthData.spo2}%
          </strong>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>GPS Coordinates</span>
          <strong style={{ fontSize: '0.92rem', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={16} color="#60a5fa" /> {location.latitude}, {location.longitude}
          </strong>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => setActiveTab('location')}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <MapPin size={16} />
          <span>View Live GPS Location Map</span>
        </button>

        <a
          href={`tel:${elderProfile.primaryContact.phone}`}
          style={{
            background: '#10b981',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <PhoneCall size={16} />
          <span>Call Caregiver ({elderProfile.primaryContact.phone})</span>
        </a>

        <span style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 600 }}>
          ✓ Simulated GSM SMS alert dispatched to caregiver phone.
        </span>
      </div>
    </div>
  );
};

export default CaregiverAlert;
