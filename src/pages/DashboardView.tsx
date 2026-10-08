import { useRef, useMemo } from 'react'; 
import TicketCard from '../components/TicketCard';
import TicketForm from '../components/TicketForm';
import { useTickets } from '../contexts/TicketContext';

export default function DashboardView() {
  return (
    <DashboardContent />
  );
}


function DashboardContent() {
  
  const { tickets, updateStatus, isLoading, error, deleteTicket } = useTickets();
  const formInputRef = useRef<HTMLInputElement | null>(null);

  
  const ticketStats = useMemo(() => {
    const openCount = tickets.filter((t: { status: string }) => t.status === 'Open').length;
    const resolvedCount = tickets.filter((t: { status: string }) => t.status === 'Resolved').length;

    return {
      open: openCount,
      resolved: resolvedCount
    };
  }, [tickets]); 



  if (isLoading) return <div>⏳ Loading tickets, please wait...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <main className="dashboard-grid">
      <h2>Active Jobs ({tickets.length})</h2>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ padding: '10px', background: '#ffebeb', borderRadius: '4px', border: '1px solid #ffccd2' }}>
          ⚠️ Open Alerts: <strong>{ticketStats.open}</strong>
        </div>
        <div style={{ padding: '10px', background: '#e6f9ed', borderRadius: '4px', border: '1px solid #cceedf' }}>
          ✅ Resolved: <strong>{ticketStats.resolved}</strong>
        </div>
      </div>

      <TicketForm inputRef={formInputRef} />

      {tickets.length > 0 ? (
        <div className="ticket-list" style={{ marginTop: '20px' }}>
          {tickets.map(ticket => (
            <TicketCard
              key={ticket.id} 
              ticket = {ticket}
              onUpdateStatus={updateStatus}
              onDeleteTicket={deleteTicket}
            />
          ))}
        </div>
      ) : (
        <div className="no-tickets" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>No active jobs at the moment. Please check back later.</p>
        </div>
      )}
    </main>
  );
}
