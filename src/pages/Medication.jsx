import React from 'react';
import MedicationSchedule from '../components/Medication/MedicationSchedule';
import NFCFlowDiagram from '../components/Medication/NFCFlowDiagram';
import MedicationHistory from '../components/Medication/MedicationHistory';
import NFCScannerModal from '../components/Medication/NFCScannerModal';
import { useApp } from '../context/AppContext';
import { Pill, Radio } from 'lucide-react';

const Medication = () => {
  const { startNfcScanSimulation } = useApp();

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
            NFC Medication Management
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Verifies container tag IDs with SmartGuardian Cuff reader before confirming medication intake.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => startNfcScanSimulation(null, false)}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Radio size={16} />
            <span>Simulate Correct NFC Scan</span>
          </button>

          <button 
            onClick={() => startNfcScanSimulation(null, true)}
            style={{
              background: '#1e293b',
              border: '1px solid #ef4444',
              color: '#f87171',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Radio size={16} />
            <span>Simulate Wrong NFC Scan</span>
          </button>
        </div>
      </div>

      <NFCFlowDiagram />

      <MedicationSchedule />

      <MedicationHistory />

      <NFCScannerModal />
    </div>
  );
};

export default Medication;
