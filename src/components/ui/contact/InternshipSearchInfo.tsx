import React from 'react';
import CalendarIcon from './icons/CalendarIcon';
import WorldIcon from './icons/WorldIcon';
import FocusIcon from './icons/FocusIcon';

const InternshipSearchInfo: React.FC = () => {
  return (
    <div 
      className="glass-panel glass-panel--chat-element px-4 py-6 sm:px-8 rounded-lg"
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
        WebkitBackdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
        border: '1px solid var(--glass-border)',
      }}
    >
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        Oh, you bet! Here's the scoop on my internship search 👇
      </p>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
            <div 
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
            >
                 <CalendarIcon className="w-4 h-4" style={{ color: '#6366f1' }} />
            </div>
            <p style={{ color: 'var(--text-primary)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Duration:</span> I'm looking for a 6-month internship starting <span className="font-bold">September 2025</span>.
            </p>
        </li>
        <li className="flex items-start gap-4">
            <div 
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            >
                <WorldIcon className="w-4 h-4" style={{ color: '#22c55e' }} />
            </div>
            <p style={{ color: 'var(--text-primary)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Location:</span> Ideally in <span className="font-bold">San Francisco</span> or anywhere in the <span className="font-bold">United States</span>.
            </p>
        </li>
        <li className="flex items-start gap-4">
            <div 
              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
            >
                <FocusIcon className="w-4 h-4" style={{ color: '#a855f7' }} />
            </div>
            <p style={{ color: 'var(--text-primary)' }}>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Focus:</span> AI development, full-stack web apps, SaaS, and agentic workflows.
            </p>
        </li>
      </ul>
    </div>
  );
};

export default InternshipSearchInfo;