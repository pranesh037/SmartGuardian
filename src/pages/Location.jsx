import React from 'react';
import InteractiveMap from '../components/Location/InteractiveMap';

const Location = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
          GPS Location & Geofencing
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
          Real-time latitude & longitude acquired by Smart Cuff NEO-6M GPS module for emergency SMS alerts.
        </p>
      </div>

      <InteractiveMap />
    </div>
  );
};

export default Location;
