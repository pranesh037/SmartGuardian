import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Activity, Zap, MapPin, Radio, Smartphone, HardDrive, AlertTriangle, Volume2, Battery, RefreshCw } from 'lucide-react';

const DeviceStatus = () => {
  const { hardwareComponents, healthData, syncDeviceHardware } = useApp();

  const getIcon = (id) => {
    switch (id) {
      case 'esp32': return <Cpu size={18} color="#60a5fa" />;
      case 'max30102': return <Activity size={18} color="#ef4444" />;
      case 'mpu6050': return <Zap size={18} color="#f59e0b" />;
      case 'gps': return <MapPin size={18} color="#3b82f6" />;
      case 'gsm': return <Radio size={18} color="#10b981" />;
      case 'nfc': return <Smartphone size={18} color="#a855f7" />;
      case 'nfc_tags': return <HardDrive size={18} color="#eab308" />;
      case 'sos': return <AlertTriangle size={18} color="#f43f5e" />;
      case 'buzzer': return <Volume2 size={18} color="#38bdf8" />;
      case 'vibration': return <Zap size={18} color="#fb923c" />;
      case 'oled': return <Smartphone size={18} color="#4ade80" />;
      case 'battery': return <Battery size={18} color="#22c55e" />;
      default: return <Cpu size={18} color="#94a3b8" />;
    }
  };

  return (
    <div className="sg-card" style={{ marginBottom: '24px' }}>
      <div className="sg-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={20} color="#60a5fa" />
          <span>SmartGuardian Cuff Diagnostics & Status</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Last Synchronized: {healthData.lastSync}
          </span>
          <button
            onClick={syncDeviceHardware}
            style={{
              background: '#1d273a',
              border: '1px solid #2b3a55',
              color: '#60a5fa',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={12} />
            <span>Sync Device</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        {hardwareComponents.map(comp => (
          <div
            key={comp.id}
            style={{
              background: '#141c2c',
              border: '1px solid #233047',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#1a2538',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getIcon(comp.id)}
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#f3f4f6', display: 'block' }}>{comp.name}</strong>
                <span style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{comp.role}</span>
              </div>
            </div>

            <span className="badge working">
              {comp.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceStatus;
