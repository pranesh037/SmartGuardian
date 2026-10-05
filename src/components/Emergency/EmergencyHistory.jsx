import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const EmergencyHistory = () => {
  const { emergencyHistory } = useApp();

  return (
    <div className="sg-card">
      <div className="sg-card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} color="#ef4444" />
          <span>Emergency System Log & History</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500 }}>
          Total Events: {emergencyHistory.length}
        </span>
      </div>

      <div className="sg-table-wrapper">
        <table className="sg-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Trigger Event</th>
              <th>Heart Rate</th>
              <th>SpO2</th>
              <th>User Response</th>
              <th>Final Status</th>
            </tr>
          </thead>
          <tbody>
            {emergencyHistory.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>{item.date}</td>
                <td>{item.time}</td>
                <td style={{ fontWeight: 600, color: '#f3f4f6' }}>{item.event}</td>
                <td>{item.heartRate}</td>
                <td>{item.spo2}</td>
                <td>{item.response}</td>
                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    {item.status === 'Emergency' ? <XCircle size={12} /> : <CheckCircle size={12} />}
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

export default EmergencyHistory;
