import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, Shield, FileText, Edit3, Save, Plus, Trash2 } from 'lucide-react';

const Profile = () => {
  const { elderProfile, setElderProfile, addNotification } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...elderProfile });

  const handleSave = (e) => {
    e.preventDefault();
    setElderProfile(formData);
    setIsEditing(false);
    addNotification('Profile Updated', 'Elder patient details updated successfully.', 'success');
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>
            Elderly Patient Profile & Contacts
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Manage elder medical history, emergency contacts, and blood group parameters.
          </p>
        </div>

        <button
          onClick={() => isEditing ? handleSave(new Event('save')) : setIsEditing(true)}
          style={{
            background: isEditing ? '#10b981' : '#2563eb',
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
          {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
          <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Core Profile Card */}
        <div className="sg-card">
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#3b82f6" />
              <span>Personal Details</span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  className="sg-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Age</label>
                  <input
                    type="number"
                    className="sg-input"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) || 72 })}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Blood Group</label>
                  <input
                    type="text"
                    className="sg-input"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Wearable Device</label>
                <input
                  type="text"
                  className="sg-input"
                  value={formData.device}
                  onChange={e => setFormData({ ...formData, device: e.target.value })}
                />
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.5rem'
                }}>
                  RK
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f3f4f6' }}>{elderProfile.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Age: {elderProfile.age} | Gender: {elderProfile.gender}</p>
                  <span className="badge safe" style={{ marginTop: '4px' }}>Blood Group: {elderProfile.bloodGroup}</span>
                </div>
              </div>

              <div style={{ background: '#141c2c', padding: '12px', borderRadius: '8px', border: '1px solid #233047', fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af', display: 'block' }}>Assigned Wearable Unit:</span>
                <strong style={{ color: '#60a5fa' }}>{elderProfile.device}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Contacts Card */}
        <div className="sg-card">
          <div className="sg-card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={20} color="#f59e0b" />
              <span>GSM Emergency Alert Recipients</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {elderProfile.emergencyContacts.map((contact, idx) => (
              <div key={contact.id} style={{
                background: '#141c2c',
                border: '1px solid #233047',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa' }}>#{idx + 1}</span>
                    <strong style={{ fontSize: '0.9rem', color: '#f3f4f6' }}>{contact.name}</strong>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{contact.phone}</span>
                </div>
                <span className="badge info">{contact.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Notes Card */}
      <div className="sg-card" style={{ marginTop: '20px' }}>
        <div className="sg-card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#a855f7" />
            <span>Important Medical Notes & History</span>
          </div>
          <span className="badge warning">Sample Demo Data Only</span>
        </div>

        {isEditing ? (
          <textarea
            className="sg-input"
            rows="4"
            value={formData.medicalNotes}
            onChange={e => setFormData({ ...formData, medicalNotes: e.target.value })}
          />
        ) : (
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', background: '#141c2c', padding: '16px', borderRadius: '10px', border: '1px solid #233047' }}>
            {elderProfile.medicalNotes}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
