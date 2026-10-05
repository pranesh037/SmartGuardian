import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, CheckCircle, AlertTriangle, X, Pill, ShieldCheck } from 'lucide-react';

const NFCScannerModal = () => {
  const {
    nfcModalOpen,
    nfcScanState,
    nfcScanResult,
    targetMedForScan,
    closeNfcModal
  } = useApp();

  if (!nfcModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div style={{
        background: '#121824',
        border: '1px solid #2b3a55',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={closeNfcModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {nfcScanState === 'scanning' && (
          <div>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '3px dashed #3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#60a5fa',
              animation: 'spin 2s linear infinite'
            }}>
              <Radio size={40} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#f3f4f6' }}>
              Scanning NFC Tag...
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginTop: '8px' }}>
              Hold medicine container near the SmartGuardian Cuff reader area.
            </p>
            <div style={{
              fontSize: '0.75rem',
              color: '#60a5fa',
              marginTop: '16px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'inline-block'
            }}>
              Expected Medicine: {targetMedForScan ? targetMedForScan.name : 'BP Tablet'}
            </div>
          </div>
        )}

        {nfcScanState === 'result' && nfcScanResult && (
          <div>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: nfcScanResult.success ? 'var(--color-safe-bg)' : 'var(--color-emergency-bg)',
              color: nfcScanResult.success ? 'var(--color-safe)' : 'var(--color-emergency)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              {nfcScanResult.success ? <CheckCircle size={40} /> : <AlertTriangle size={40} />}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: nfcScanResult.success ? '#34d399' : '#f87171'
            }}>
              {nfcScanResult.result}
            </h3>

            <div style={{
              background: '#182030',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #28354e',
              margin: '16px 0',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#9ca3af' }}>NFC Tag ID Detected:</span>
                <strong style={{ color: '#f3f4f6' }}>{nfcScanResult.tagId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#9ca3af' }}>Medicine Container:</span>
                <strong style={{ color: '#f3f4f6' }}>{nfcScanResult.medicineName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Scheduled Time:</span>
                <strong style={{ color: '#f3f4f6' }}>{nfcScanResult.scheduledTime}</strong>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: nfcScanResult.success ? '#a7f3d0' : '#fca5a5', marginBottom: '20px' }}>
              {nfcScanResult.message}
            </p>

            <button
              onClick={closeNfcModal}
              style={{
                width: '100%',
                background: nfcScanResult.success ? '#10b981' : '#2563eb',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Done / Close
            </button>
          </div>
        )}

        <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '16px', fontStyle: 'italic' }}>
          * Hardware Prototype Note: Browser NFC simulation replaces physical ESP32 PN532 scanner.
        </p>
      </div>
    </div>
  );
};

export default NFCScannerModal;
