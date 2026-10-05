import React from 'react';
import SmartCuffVisual from '../components/Device/SmartCuffVisual';
import DeviceStatus from '../components/Device/DeviceStatus';
import HardwareArchitecture from '../components/Device/HardwareArchitecture';

const Device = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
          SmartGuardian Cuff Hardware Architecture
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
          Comprehensive diagnostic view of the single wearable Smart Cuff and ESP32 subsystem modules.
        </p>
      </div>

      <SmartCuffVisual />

      <DeviceStatus />

      <HardwareArchitecture />
    </div>
  );
};

export default Device;
