import React from 'react';
import { Award, Zap } from 'lucide-react';

const ProjectHeader = () => {
  const innovations = [
    "1. Multi-sensor emergency detection",
    "2. 10-second emergency confirmation",
    "3. NFC-based medication verification",
    "4. Integrated health monitoring",
    "5. GPS-based emergency location",
    "6. GSM-based caregiver alert",
    "7. Smart caregiver application"
  ];

  return (
    <div className="project-banner">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={22} color="#60a5fa" />
          <h2>College Engineering Design Thinking Project</h2>
        </div>
        <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
          Functional Prototype
        </span>
      </div>

      <p>
        "SmartGuardian is a low-cost intelligent wearable system designed to improve the safety, health monitoring and medication adherence of elderly people living alone."
      </p>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', marginBottom: '6px' }}>
          <Zap size={14} />
          <span>CORE INNOVATIONS</span>
        </div>
        <div className="innovations-pills">
          {innovations.map((item, idx) => (
            <span key={idx} className="innovation-tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
