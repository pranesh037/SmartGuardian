import React from 'react';
import { Package, Radio, Cpu, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

const NFCFlowDiagram = () => {
  const steps = [
    { title: "Medicine Container", subtitle: "With NFC Tag Attached", icon: Package, color: "#3b82f6" },
    { title: "NFC Tag (MED001)", subtitle: "Passive 13.56MHz Tag", icon: Radio, color: "#f59e0b" },
    { title: "Smart Cuff Reader", subtitle: "PN532 Reader Area", icon: Smartphone, color: "#8b5cf6" },
    { title: "ESP32 Processor", subtitle: "Verifies ID & Schedule", icon: Cpu, color: "#10b981" },
    { title: "Caregiver App", subtitle: "Instant Status Update", icon: CheckCircle2, color: "#ec4899" }
  ];

  return (
    <div className="sg-card" style={{ marginBottom: '24px' }}>
      <div className="sg-card-title">
        <span>NFC Medication Verification System Architecture</span>
        <span className="innovation-tag">Main Innovation</span>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '16px',
        background: '#0d131f',
        borderRadius: '12px',
        border: '1px solid #1f293d'
      }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '12px 16px',
                background: '#141c2c',
                borderRadius: '10px',
                border: '1px solid #233047',
                flex: '1',
                minWidth: '130px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${step.color}22`,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <Icon size={20} />
                </div>
                <strong style={{ fontSize: '0.85rem', color: '#f3f4f6' }}>{step.title}</strong>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' }}>{step.subtitle}</span>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ color: '#4b5563', display: 'flex', alignItems: 'center' }}>
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default NFCFlowDiagram;
