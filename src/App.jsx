import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketCard from './components/TicketCard';
import TicketForm from './components/TicketForm';
import './App.css';

import { apiClient } from './api/apiClient';

function Header() {
  return (
    <header className="app-header">
      <h1>🎟️ TicketAlert Dashboard</h1>
      <p>Real-time job status tracking</p>
    </header>
  );
}

export default function App() {

  const [tickets, setTickets] = useState([
    // { id: 101, jobTitle: "Server Database Migration", user: "Alex Rivera", status: "In Progress", priority: "High" },
    // { id: 102, jobTitle: "Fix Login Page CSS Glitch", user: "Sarah Chen", status: "Open", priority: "Low" }
  ]);
  
  useEffect(() => {
    apiClient.get('product')
      .then((response) => setTickets(response.data));
  }, []);


  

  const handleAddTicket = (typedTitle) => {
    const newTicket = { id: Date.now(), jobTitle: typedTitle, user: "System Admin", status: "Open", priority: "Medium" };
    setTickets([...tickets, newTicket]);
  };

  // 🆕 The Remote Control function to edit a single ticket inside our state
  const handleUpdateStatus = (ticketId) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        // If this is the ticket that was clicked, return a copy with its status changed
        return { ...ticket, status: 'Resolved' };
      }
      // Otherwise, return the ticket exactly as it was
      return ticket;
    });

    // Hand the brand-new updated list back to the remote control!
    setTickets(updatedTickets);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="dashboard-grid">
        <h2>Active Jobs ({tickets.length})</h2>
        <TicketForm onAddTicket={handleAddTicket} />

        <div className="ticket-list" style={{ marginTop: '20px' }}>
          {Array.isArray(tickets) && tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id} // 👈 Pass the ID down so the card knows who it is
              jobTitle={ticket.jobTitle}
              user={ticket.user}
              status={ticket.status}
              priority={ticket.priority}
              onUpdateStatus={handleUpdateStatus} // 👈 Pass the update function down
            />
          ))}
        </div>


        {tickets.length > 0 ? (
          <div className="no-tickets">
            <p>Jobs are up and comming</p>
          </div>) : (
          <div className="no-tickets">
            <p>No active jobs at the moment. Please check back later.</p>
          </div>
        )}


      </main >
    </div >
  );
}
