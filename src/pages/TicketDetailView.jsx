import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import TicketForm from '../components/TicketForm';

import { useTickets } from '../contexts/TicketContext';

export default function TicketDetailView() {
  const { id } = useParams(); // Grabs the direct ID parameter value from the URL path
  const [ticket, setTicket] = useState(null);
  const [activeTicketId, setActiveTicketId] = useState(null); // State to hold the ticket being edited

  const { isLoading, error, dispatch, deleteTicket } = useTickets();
  // const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    dispatch({ type: 'FETCH_TICKETS' });
    

    apiClient.get(`product/${id}`)
      .then((response) => {
        setTicket(response.data);
        dispatch({ type: 'PROCESSING_COMPLETED' });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      });
  }, [id]); // Triggers again if route shifts to a different ticket ID

  const openForm = (ticketId) => {
    setActiveTicketId(ticketId);
  };

  const handleFormSuccess = (updatedTitle) => {
    setTicket((prevTicket) => ({
      ...prevTicket, jobTitle: updatedTitle
    }));
    setActiveTicketId(null); // Close the form after successful update
  }



  if (isLoading) return <div>⏳ Loading tickets, please wait...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  if (!ticket) return <p>System Profile Error: Target ID {id} not found. <Link to="/">Return home</Link></p>;

  return (
    <div>
      {!activeTicketId &&
        <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>&larr; Back to Operational Dashboard</Link>
          <h2 style={{ marginTop: '15px' }}>Job Analysis Profile #{id} &nbsp;
            <button onClick={() => { openForm(ticket.id) }} style={{ marginRight: '10px', padding: '6px 12px', background: '#f39c12', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>

          </h2>
          <hr />
          <div style={{ lineHeight: '1.8' }}>
            <p><strong>Job Title:</strong> {ticket.jobTitle}</p>
            <p><strong>Assigned Engineer:</strong> {ticket.user || 'Unassigned'}</p>
            <p><strong>Current Lifecycle State:</strong> <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#e0f7fa' }}>{ticket.status}</span></p>
            <p><strong>Priority Tier:</strong> {ticket.priority}</p>
          </div>
        </div>}
      <div>

        {activeTicketId && (
          <TicketForm
            isEditMode={true} initialData={ticket} onSuccess={handleFormSuccess}
          />
          // Logic to handle the updated title for the ticket 
        )}
      </div>
    </div>);
}
