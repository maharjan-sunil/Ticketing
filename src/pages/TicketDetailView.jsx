import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/apiClient';

export default function TicketDetailView() {
  const { id } = useParams(); // Grabs the direct ID parameter value from the URL path
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Dynamic endpoint lookup using our route param!
    apiClient.get(`product/${id}`)
      .then((response) => {
        setTicket(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Could not load specific ticket profile details", err);
        setLoading(false);
      });
  }, [id]); // Triggers again if route shifts to a different ticket ID

  if (loading) return <p>Loading job analytics metrics...</p>;
  if (!ticket) return <p>System Profile Error: Target ID {id} not found. <Link to="/">Return home</Link></p>;

  return (
    <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>&larr; Back to Operational Dashboard</Link>
      
      <h2 style={{ marginTop: '15px' }}>Job Analysis Profile #{id}</h2>
      <hr />
      <div style={{ lineHeight: '1.8' }}>
        <p><strong>Job Title:</strong> {ticket.jobTitle}</p>
        <p><strong>Assigned Engineer:</strong> {ticket.user || 'Unassigned'}</p>
        <p><strong>Current Lifecycle State:</strong> <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#e0f7fa' }}>{ticket.status}</span></p>
        <p><strong>Priority Tier:</strong> {ticket.priority}</p>
      </div>
    </div>
  );
}
