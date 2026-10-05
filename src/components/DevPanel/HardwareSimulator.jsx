import React from 'react';
import { useApp } from '../../context/AppContext';
import { SlidersHorizontal, AlertTriangle, Heart, Activity, Radio, WifiOff, RefreshCw, CheckCircle, X } from 'lucide-react';

const HardwareSimulator = () => {
  const {
    devPanelOpen,
    setDevPanelOpen,
    triggerPossibleEmergency,
    startNfcScanSimulation,
    setHealthData,
    resetEmergencyState,
    addNotification
  } = useApp();

  if (!devPanelOpen) return null;

  const handleSimulateNormal = () => {
    resetEmergencyState();
    setHealthData(prev => ({
      ...prev,
      heartRate: 72,
      spo2: 98,
      activity: 'Normal',
      fallStatus: 'No Fall Detected',
      connected: true
    }));
    addNotification('Simulation', 'Hardware state set to Normal SAFE.', 'info');
  };

  const handleSimulateHighHr = () => {
    setHealthData(prev => ({ ...prev, heartRate: 128 }));
    triggerPossibleEmergency('Abnormal Heart Rate (128 BPM)');
  };

  const handleSimulateLowSpo2 = () => {
    setHealthData(prev => ({ ...prev, spo2: 89 }));
    triggerPossibleEmergency('Low Oxygen SpO2 (89%)');
  };

  const handleSimulateDisconnect = () => {
    setHealthData(prev => ({ ...prev, connected: false }));
    addNotification('Device Alert', 'ESP32 Smart Cuff connection lost!', 'error');
  };

  return (
    <div className="dev-drawer">
      <div className="dev-drawer-content">
        <div className="dev-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={18} />
            <span>College Presentation Demo Panel</span>
          </div>
          <button
            onClick={() => setDevPanelOpen(false)}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '12px' }}>
          Instantly simulate physical sensor states for project demonstration:
        </p>

        <div className="dev-buttons-grid">
          <button className="dev-btn green" onClick={handleSimulateNormal}>
            Simulate Normal State
          </button>

          <button className="dev-btn red" onClick={() => triggerPossibleEmergency('Fall Detected (MPU6050)')}>
            Simulate Fall
          </button>

          <button className="dev-btn red" onClick={() => triggerPossibleEmergency('Manual SOS Button Pressed')}>
            Simulate SOS
          </button>

          <button className="dev-btn red" onClick={handleSimulateLowSpo2}>
            Simulate Low SpO2
          </button>

          <button className="dev-btn red" onClick={handleSimulateHighHr}>
            Simulate High HR
          </button>

          <button className="dev-btn green" onClick={() => startNfcScanSimulation(null, false)}>
            NFC Correct Med
          </button>

          <button className="dev-btn red" onClick={() => startNfcScanSimulation(null, true)}>
            NFC Wrong Med
          </button>

          <button className="dev-btn red" onClick={handleSimulateDisconnect}>
            Simulate Disconnect
          </button>
        </div>

        <button
          onClick={resetEmergencyState}
          style={{
            width: '100%',
            marginTop: '12px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={14} />
          <span>Reset Hardware & System</span>
        </button>
      </div>
    </div>
  );
};

export default HardwareSimulator;
