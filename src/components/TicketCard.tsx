import { Link } from 'react-router-dom'; // 👈 Import Link
import { TicketCardProps } from '../types/ticket';

export default function TicketCard({ ticket, onUpdateStatus, onDeleteTicket }: TicketCardProps) {
  const { id, jobTitle, user, status, priority } = ticket;
  return (
    <div className="ticket-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '6px', margin: '10px 0' }}>
      {/* 🆕 Clicking the title now routes cleanly without refreshing the app */}
      <h3 style={{ margin: '0 0 10px 0' }}>
        <Link to={`/ticket/${id}`} style={{ color: '#2c3e50', textDecoration: 'none' }} className="ticket-title-link">
          {jobTitle}
        </Link>&nbsp;
        <button
          onClick={() => onDeleteTicket(id)}
          style={{ marginLeft: '10px', padding: '4px 8px', background: '#e74c3c', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Delete
        </button>
      </h3>
      <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>Assigned to: {user}</p>
      <p style={{ margin: '5px 0' }}>Priority: <strong>{priority}</strong></p>
      <p style={{ margin: '5px 0' }}>Status: <span className={`status-${status.toLowerCase()}`}>{status}</span></p>

      {status !== 'Resolved' && (
        <button
          onClick={() => onUpdateStatus(id)}
          style={{ marginTop: '10px', padding: '6px 12px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Resolve Job
        </button>
      )}
    </div>
  );
}
