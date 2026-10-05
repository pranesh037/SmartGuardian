import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, ShieldAlert, Radio, Compass } from 'lucide-react';

const InteractiveMap = () => {
  const { location, fetchCurrentLocation } = useApp();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {/* Map Interactive Visualization Panel */}
      <div className="sg-card" style={{ gridColumn: 'span 2' }}>
        <div className="sg-card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#3b82f6" />
            <span>GPS Geolocation Tracking Panel</span>
          </div>
          <button
            onClick={fetchCurrentLocation}
            style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Navigation size={16} />
            <span>Get Current Location</span>
          </button>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #233047',
          background: '#0d131f'
        }}>
          {/* Tile Background Simulation */}
          <iframe
            title="SmartGuardian GPS Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.015}%2C${location.latitude - 0.015}%2C${location.longitude + 0.015}%2C${location.latitude + 0.015}&amp;layer=mapnik&amp;marker=${location.latitude}%2C${location.longitude}`}
            style={{ border: 0, filter: 'contrast(1.05) brightness(0.9)' }}
          />

          {/* Location Overlay Badge */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #3b82f6',
            borderRadius: '10px',
            padding: '12px 16px',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px #ef4444'
            }}>
              <MapPin size={20} />
            </div>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#f3f4f6', display: 'block' }}>
                Smart Cuff GPS Fix Active
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#60a5fa' }}>
                Lat: {location.latitude} | Lon: {location.longitude}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Geolocation Details Sidebar */}
      <div className="sg-card">
        <div className="sg-card-title">
          <span>Location Parameters</span>
          <span className="badge safe">{location.status}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Latitude</span>
            <strong style={{ fontSize: '1.2rem', color: '#f3f4f6' }}>{location.latitude}</strong>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Longitude</span>
            <strong style={{ fontSize: '1.2rem', color: '#f3f4f6' }}>{location.longitude}</strong>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Address / Region</span>
            <strong style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>{location.address}</strong>
          </div>

          <div style={{ background: '#141c2c', padding: '14px', borderRadius: '10px', border: '1px solid #233047' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Last GPS Handshake</span>
            <strong style={{ fontSize: '0.92rem', color: '#10b981' }}>{location.lastUpdated}</strong>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <ShieldAlert size={20} color="#ef4444" />
            <span style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 600 }}>
              Location will be attached to emergency alerts automatically.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
