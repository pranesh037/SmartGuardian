import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';

const NotificationPanel = ({ onClose }) => {
  const { notifications } = useApp();

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} color="#10b981" />;
      case 'warning': return <AlertTriangle size={16} color="#f59e0b" />;
      case 'error': return <XCircle size={16} color="#ef4444" />;
      default: return <Info size={16} color="#3b82f6" />;
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50px',
      right: '0',
      width: '340px',
      maxHeight: '400px',
      background: '#121824',
      border: '1px solid #1f293d',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1f293d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0f1520'
      }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f3f4f6' }}>
          Notification Log ({notifications.length})
        </span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ overflowY: 'auto', padding: '8px' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>
            No recent notifications.
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} style={{
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#182030',
              marginBottom: '6px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start'
            }}>
              <div style={{ marginTop: '2px' }}>
                {getNotifIcon(n.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e5e7eb' }}>
                    {n.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                    {n.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0, lineHeight: '1.3' }}>
                  {n.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
