import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

// 1. Create the radio station
const TicketContext = createContext(null);

// 2. Create a custom provider component
export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);

  // Fetch data on load
  useEffect(() => {
    apiClient.get('product')
      .then((response) => setTickets(response.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Action: Add Ticket
  const handleAddTicket = (typedTitle) => {
    const newTicket = { 
      id: Date.now(), 
      jobTitle: typedTitle, 
      user: "System Admin", 
      status: "Open", 
      priority: "Medium" 
    };
    setTickets((prev) => [...prev, newTicket]);
  };

  // Action: Update Status
  const handleUpdateStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
  };

  // Bundle the state and actions together to broadcast
  const value = {
    tickets,
    addTicket: handleAddTicket,
    updateStatus: handleUpdateStatus,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}

// 3. Create a quick helper hook so we don't have to keep importing useContext(TicketContext)
export function useTickets() {
  return useContext(TicketContext);
}
