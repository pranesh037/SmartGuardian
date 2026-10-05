import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Activity, Zap, MapPin, Radio, Smartphone, HardDrive, AlertTriangle, Volume2, Battery, Eye } from 'lucide-react';

const SmartCuffVisual = () => {
  const { healthData, emergencyStatus } = useApp();
  const [activePin, setActivePin] = useState(null);

  const componentHotspots = [
    { id: 'oled', name: '0.96" OLED Display', pos: { top: '30%', left: '42%' }, desc: 'Displays live HR, SpO2, countdown & medication alerts.' },
    { id: 'sos', name: 'Physical SOS Button', pos: { top: '22%', left: '60%' }, desc: 'Immediate tactile alert button for emergency help.' },
    { id: 'nfc', name: 'NFC Reader Area', pos: { top: '55%', left: '38%' }, desc: 'Scans container NFC tags for medicine verification.' },
    { id: 'max30102', name: 'MAX30102 Sensor (Underneath)', pos: { top: '75%', left: '45%' }, desc: 'Optical PPG sensor for continuous HR & SpO2 monitoring.' },
    { id: 'mpu6050', name: 'MPU6050 Accelerometer', pos: { top: '35%', left: '26%' }, desc: '6-axis IMU for 3D motion tracking & fall detection.' },
    { id: 'esp32', name: 'ESP32 Microcontroller', pos: { top: '48%', left: '24%' }, desc: 'Core 240MHz dual-core processing & sensor hub.' },
    { id: 'gps', name: 'GPS Module (NEO-6M)', pos: { top: '22%', left: '30%' }, desc: 'Acquires precise latitude & longitude for alerts.' },
    { id: 'gsm', name: 'GSM SIM800L Module', pos: { top: '65%', left: '22%' }, desc: 'Transmits emergency SMS via cellular connection.' },
    { id: 'buzzer', name: 'Piezo Alarm Buzzer', pos: { top: '20%', left: '50%' }, desc: 'Emits loud 85dB alert prompts on fall or countdown.' },
    { id: 'vibration', name: 'Haptic Vibration Motor', pos: { top: '70%', left: '58%' }, desc: 'Tactile wrist vibration for pill reminders & alarms.' },
    { id: 'battery', name: '3.7V Li-Po Battery', pos: { top: '52%', left: '62%' }, desc: 'Rechargeable power unit with battery monitoring circuit.' }
  ];

  return (
    <div className="sg-card" style={{ marginBottom: '24px' }}>
      <div className="sg-card-title">
        <span>SmartGuardian Smart Cuff Physical Schematic</span>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Hover/Click pins to inspect hardware modules</span>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '360px',
        background: 'radial-gradient(circle at center, #1a2538 0%, #0c121e 100%)',
        borderRadius: '16px',
        border: '1px solid #25334c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden'
      }}>
        {/* Background Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Vector Representation of Smart Cuff */}
        <div style={{
          position: 'relative',
          width: '520px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Wrist Strap Left */}
          <div style={{
            position: 'absolute',
            left: '0',
            width: '180px',
            height: '85px',
            background: 'linear-gradient(90deg, #1e293b, #334155)',
            borderRadius: '16px 0 0 16px',
            border: '2px solid #475569',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '2px', transform: 'rotate(-90deg)', fontWeight: 700 }}>
              VELCRO ADJ STRAP
            </span>
          </div>

          {/* Wrist Strap Right */}
          <div style={{
            position: 'absolute',
            right: '0',
            width: '180px',
            height: '85px',
            background: 'linear-gradient(90deg, #334155, #1e293b)',
            borderRadius: '0 16px 16px 0',
            border: '2px solid #475569',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '2px', transform: 'rotate(90deg)', fontWeight: 700 }}>
              COMFORT FABRIC
            </span>
          </div>

          {/* Main Cuff Enclosure Body */}
          <div style={{
            position: 'relative',
            width: '260px',
            height: '160px',
            background: 'linear-gradient(145deg, #0f172a, #1e293b)',
            borderRadius: '24px',
            border: '3px solid #3b82f6',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(59, 130, 246, 0.3)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px'
          }}>
            {/* Top Housing - Buzzer Grill & SOS */}
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                <div style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
                <div style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
                <div style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '1px' }}>
                SMARTGUARDIAN
              </span>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px #ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.6rem',
                fontWeight: 900
              }}>
                SOS
              </div>
            </div>

            {/* Simulated OLED Screen */}
            <div style={{
              width: '90%',
              height: '75px',
              background: '#000000',
              borderRadius: '8px',
              border: '2px solid #1d4ed8',
              boxShadow: 'inset 0 0 10px rgba(59,130,246,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.65rem', color: '#38bdf8' }}>
                <span>HR: {healthData.heartRate} BPM</span>
                <span>SpO2: {healthData.spo2}%</span>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: emergencyStatus === 'SAFE' ? '#4ade80' : '#f87171',
                marginTop: '4px',
                letterSpacing: '1px'
              }}>
                STATUS: {emergencyStatus}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#64748b', marginTop: '2px' }}>
                ESP32 OK | NFC READY
              </div>
            </div>

            {/* Bottom NFC Antenna Marking */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.68rem',
              color: '#94a3b8',
              fontWeight: 600
            }}>
              <Radio size={12} color="#f59e0b" />
              <span>NFC SCAN ZONE</span>
            </div>
          </div>

          {/* Interactive Component Hotspot Pins */}
          {componentHotspots.map(pin => (
            <button
              key={pin.id}
              onClick={() => setActivePin(pin)}
              onMouseEnter={() => setActivePin(pin)}
              style={{
                position: 'absolute',
                top: pin.pos.top,
                left: pin.pos.left,
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#3b82f6',
                border: '2px solid white',
                boxShadow: '0 0 10px #3b82f6',
                cursor: 'pointer',
                zIndex: 30,
                animation: 'pulsePin 1.5s infinite alternate'
              }}
              title={pin.name}
            />
          ))}
        </div>

        {/* Selected Component Information Overlay Card */}
        {activePin && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3b82f6',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 40
          }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#93c5fd', display: 'block' }}>
                Hardware Module: {activePin.name}
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>
                {activePin.desc}
              </span>
            </div>
            <button
              onClick={() => setActivePin(null)}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartCuffVisual;
