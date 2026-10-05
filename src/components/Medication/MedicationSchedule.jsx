import React from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, Clock, CheckCircle, Radio, Bell } from 'lucide-react';

const MedicationSchedule = () => {
  const { medications, startNfcScanSimulation, addNotification } = useApp();

  return (
    <div className="sg-card" style={{ marginBottom: '24px' }}>
      <div className="sg-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Pill size={20} color="#3b82f6" />
          <span>Today's Medication Schedule</span>
        </div>
        <button
          onClick={() => startNfcScanSimulation(null, false)}
          style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Radio size={16} />
          <span>Simulate NFC Scan</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {medications.map((med) => (
          <div
            key={med.id}
            style={{
              background: '#141c2c',
              border: `1px solid ${med.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.4)' : '#25334d'}`,
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6' }}>{med.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Dosage: {med.dosage}</span>
                </div>
                <span className={`badge ${med.status.toLowerCase()}`}>
                  {med.status}
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '12px' }}>
                {med.instructions}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="#60a5fa" />
                  <span>Time: <strong>{med.time}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Radio size={14} color="#f59e0b" />
                  <span>Tag ID: <strong>{med.nfcTagId}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={() => addNotification('Medication Reminder Sent', `Vibration & Buzzer reminder dispatched to Smart Cuff for ${med.name}`, 'info')}
                style={{
                  flex: 1,
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#94a3b8',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Bell size={12} />
                <span>Remind Now</span>
              </button>

              <button
                onClick={() => startNfcScanSimulation(med, false)}
                style={{
                  flex: 1,
                  background: med.status === 'Confirmed' ? '#065f46' : '#1d4ed8',
                  border: 'none',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Radio size={12} />
                <span>{med.status === 'Confirmed' ? 'Re-Scan NFC' : 'Scan NFC'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationSchedule;
