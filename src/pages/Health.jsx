import React from 'react';
import HealthCharts from '../components/Health/HealthCharts';

const Health = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
          Real-Time Health Monitoring
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
          Continuous telemetry stream from MAX30102 PPG pulse oximeter & MPU6050 6-axis motion sensors.
        </p>
      </div>

      <HealthCharts />
    </div>
  );
};

export default Health;
