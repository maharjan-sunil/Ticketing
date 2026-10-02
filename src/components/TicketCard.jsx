import React from 'react';

// We added "onUpdateStatus" and "id" to the props destructured here
export default function TicketCard({ id, jobTitle, user, status, priority, onUpdateStatus }) {
  return (
    <div className={`ticket-card ${priority.toLowerCase()}`}>
      <h3>{jobTitle}</h3>
      <p><strong>Assigned To:</strong> {user}</p>
      <div className="ticket-meta">
        <span className="status-badge">{status}</span>
        <span className="priority-label">⚠️ {priority}</span>
      </div>

      {/* 🆕 Clicking this button will pass this ticket's unique ID back up to App.jsx */}
      {status !== 'Resolved' && (
        <button 
          onClick={() => onUpdateStatus(id)} 
          className="btn-status"
          style={{ marginTop: '10px', display: 'block' }}
        >
          ✅ Mark as Resolved
        </button>
      )}
    </div>
  );
}
