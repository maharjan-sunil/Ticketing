import React, { useRef, useMemo } from 'react'; // 1. Import useMemo
import TicketCard from '../components/TicketCard';
import TicketForm from '../components/TicketForm';
import { TicketProvider, useTickets } from '../contexts/TicketContext';

// Wrap the view inside our provider
export default function DashboardView() {
  return (
      <DashboardContent />    
  );
}

// The clean content component
function DashboardContent() {
  // Grab everything we need straight out of Context!
  const { tickets, updateStatus, isLoading, error } = useTickets();
  const formInputRef = useRef(null);

  // 🌟 2. Add useMemo here to calculate your stats using the context data
  const ticketStats = useMemo(() => {
    const openCount = tickets.filter(t => t.status === 'Open').length;
    const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

    return {
      open: openCount,
      resolved: resolvedCount
    };
  }, [tickets]); // 👈 It watches the 'tickets' array from context!


  // 2. Handle the loading state right here for this specific page
  
  if (isLoading) return <div>⏳ Loading tickets, please wait...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <main className="dashboard-grid">
      <h2>Active Jobs ({tickets.length})</h2>

      {/* 🌟 3. Render the memoized metrics right below the header */}
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
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id} 
              jobTitle={ticket.jobTitle}
              user={ticket.user}
              status={ticket.status}
              priority={ticket.priority}
              onUpdateStatus={updateStatus} 
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
