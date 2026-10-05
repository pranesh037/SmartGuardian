import React from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, CheckCircle, Clock } from 'lucide-react';

const MedicationHistory = () => {
  const { medicationHistory } = useApp();

  return (
    <div className="sg-card">
      <div className="sg-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="#10b981" />
          <span>Medication Adherence History Log</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          Verified Entries: {medicationHistory.length}
        </span>
      </div>

      <div className="sg-table-wrapper">
        <table className="sg-table">
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Scheduled Time</th>
              <th>NFC Verification Status</th>
              <th>Confirmation Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicationHistory.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, color: '#f3f4f6' }}>{item.medication}</td>
                <td>{item.scheduledTime}</td>
                <td style={{ color: item.nfcStatus.includes('Verified') ? '#34d399' : '#f59e0b', fontWeight: 600 }}>
                  {item.nfcStatus}
                </td>
                <td>{item.confirmationTime}</td>
                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    <CheckCircle size={12} />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationHistory;
