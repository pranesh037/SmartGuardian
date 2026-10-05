import React from 'react';
import { Cpu, Server, Smartphone, Radio, ArrowRight, ShieldCheck } from 'lucide-react';

const HardwareArchitecture = () => {
  const integrationFlows = [
    { sensor: "MAX30102 (HR + SpO2)", bus: "I2C Bus", processor: "ESP32", backend: "Firebase Realtime DB", app: "Health Monitoring View" },
    { sensor: "MPU6050 (Motion/Fall)", bus: "I2C / Interrupt", processor: "ESP32", backend: "Emergency Engine", app: "10-Sec Red Emergency Modal" },
    { sensor: "PN532 NFC Reader", bus: "SPI / HSU", processor: "ESP32", backend: "Medication Verifier", app: "Container Verification Status" },
    { sensor: "NEO-6M GPS Module", bus: "UART Serial", processor: "ESP32 / GSM", backend: "Geolocation Dispatch", app: "Caregiver Emergency Map" },
    { sensor: "SIM800L GSM Module", bus: "AT Commands", processor: "ESP32", backend: "Cellular SMS Gateway", app: "Caregiver Phone Notification" },
  ];

  return (
    <div className="sg-card">
      <div className="sg-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Server size={20} color="#10b981" />
          <span>Future Hardware Integration Architecture</span>
        </div>
        <span className="innovation-tag">ESP32 + Firebase Ready</span>
      </div>

      <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '16px' }}>
        The SmartGuardian frontend is designed with a clean service layer (`services/`) ready to seamlessly hook into Firebase Realtime Database or an Express backend when physical ESP32 hardware is deployed.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {integrationFlows.map((flow, idx) => (
          <div key={idx} style={{
            background: '#141c2c',
            border: '1px solid #233047',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.82rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f3f4f6', fontWeight: 700, minWidth: '170px' }}>
              <Cpu size={16} color="#60a5fa" />
              <span>{flow.sensor}</span>
            </div>

            <ArrowRight size={14} color="#64748b" />

            <div style={{ color: '#93c5fd', background: '#1e293b', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
              {flow.processor}
            </div>

            <ArrowRight size={14} color="#64748b" />

            <div style={{ color: '#34d399', background: '#064e3b', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
              {flow.backend}
            </div>

            <ArrowRight size={14} color="#64748b" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f43f5e', fontWeight: 700 }}>
              <Smartphone size={14} />
              <span>{flow.app}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareArchitecture;
