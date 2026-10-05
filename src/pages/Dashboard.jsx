import React from 'react';
import { useApp } from '../context/AppContext';
import ProjectHeader from '../components/Common/ProjectHeader';
import CaregiverAlert from '../components/Emergency/CaregiverAlert';
import { Heart, Activity, Zap, Battery, Radio, Shield, Pill, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const {
    elderProfile,
    healthData,
    emergencyStatus,
    medications,
    triggerPossibleEmergency,
    startNfcScanSimulation,
    setActiveTab
  } = useApp();

  const nextMed = medications.find(m => m.status === 'Pending') || medications[0];

  return (
    <div className="page-container">
      <ProjectHeader />

      <CaregiverAlert />

      {/* Welcome Banner & Quick Action Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
            Good Morning, Caregiver
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#9ca3af' }}>
            Real-time monitoring active for patient <strong>{elderProfile.name}</strong> ({elderProfile.age} yrs).
          </p>
        </div>

        {/* Quick Demo Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => triggerPossibleEmergency('Fall Detected (MPU6050)')}
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}
          >
            <AlertTriangle size={16} />
            <span>Simulate Fall Detection</span>
          </button>

          <button
            onClick={() => triggerPossibleEmergency('Manual SOS Button Pressed')}
            style={{
              background: '#b91c1c',
              color: 'white',
              border: '1px solid #f87171',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertTriangle size={16} />
            <span>Simulate SOS</span>
          </button>
        </div>
      </div>

      {/* Grid: Elder Overview + Quick Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Elder Profile Overview Card */}
        <div className="sg-card" style={{ background: 'linear-gradient(135deg, #141c2c, #0f1523)' }}>
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={20} color="#10b981" />
              <span>Elder Patient Status</span>
            </div>
            <span className={`badge ${emergencyStatus === 'SAFE' ? 'safe' : 'emergency'}`}>
              {emergencyStatus}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.4rem',
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)'
            }}>
              RK
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f3f4f6' }}>{elderProfile.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Age: {elderProfile.age} Years | Blood: {elderProfile.bloodGroup}</p>
              <p style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginTop: '2px' }}>Device: {elderProfile.device}</p>
            </div>
          </div>

          <div style={{
            background: '#0d131f',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #1f293d',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.82rem'
          }}>
            <span style={{ color: '#9ca3af' }}>Primary Contact:</span>
            <strong style={{ color: '#f3f4f6' }}>{elderProfile.primaryContact.name}</strong>
          </div>
        </div>

        {/* Next Scheduled Medication Card */}
        <div className="sg-card">
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pill size={20} color="#3b82f6" />
              <span>Next Scheduled Medicine</span>
            </div>
            <span className={`badge ${nextMed.status.toLowerCase()}`}>
              {nextMed.status}
            </span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f3f4f6' }}>{nextMed.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '2px' }}>Scheduled: <strong>{nextMed.time}</strong> (Dosage: {nextMed.dosage})</p>
            <p style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600, marginTop: '4px' }}>Container Tag ID: {nextMed.nfcTagId}</p>
          </div>

          <button
            onClick={() => startNfcScanSimulation(nextMed, false)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Radio size={16} />
            <span>Verify via NFC Container Scan</span>
          </button>
        </div>
      </div>

      {/* Main Health Metrics Grid */}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#f3f4f6', marginBottom: '16px' }}>
        Live Smart Cuff Sensor Vitals
      </h3>

      <div className="metrics-grid">
        <div className="metric-card" onClick={() => setActiveTab('health')} style={{ cursor: 'pointer' }}>
          <div className="metric-header">
            <span>HEART RATE</span>
            <div className="metric-icon-wrap red">
              <Heart size={18} />
            </div>
          </div>
          <div className="metric-value">{healthData.heartRate} <span style={{ fontSize: '1rem', color: '#9ca3af' }}>BPM</span></div>
          <div className="metric-status" style={{ color: '#10b981' }}>
            ● Status: Normal
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab('health')} style={{ cursor: 'pointer' }}>
          <div className="metric-header">
            <span>SPO2 SATURATION</span>
            <div className="metric-icon-wrap blue">
              <Activity size={18} />
            </div>
          </div>
          <div className="metric-value">{healthData.spo2} <span style={{ fontSize: '1rem', color: '#9ca3af' }}>%</span></div>
          <div className="metric-status" style={{ color: '#10b981' }}>
            ● Status: Normal
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab('health')} style={{ cursor: 'pointer' }}>
          <div className="metric-header">
            <span>ACTIVITY LEVEL</span>
            <div className="metric-icon-wrap green">
              <Zap size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '1.4rem' }}>{healthData.activity}</div>
          <div className="metric-status" style={{ color: '#60a5fa' }}>
            ● Steps: {healthData.steps.toLocaleString()}
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab('device')} style={{ cursor: 'pointer' }}>
          <div className="metric-header">
            <span>CUFF BATTERY</span>
            <div className="metric-icon-wrap yellow">
              <Battery size={18} />
            </div>
          </div>
          <div className="metric-value">{healthData.battery} <span style={{ fontSize: '1rem', color: '#9ca3af' }}>%</span></div>
          <div className="metric-status" style={{ color: '#10b981' }}>
            ● Connection: CONNECTED
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
