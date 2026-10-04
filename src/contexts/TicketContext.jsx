import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { apiClient } from '../api/apiClient';

// 1. Create the context radio station
const TicketContext = createContext(null);

// 2. Define your initial state and reducer function FIRST (at the top)
const initialState = {
  isLoading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS':
      return { ...state, isLoading: true, error: null };
    case 'PROCESSING_COMPLETED':
      return { ...state, isLoading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// 3. Create your provider component
export function TicketProvider({ children }) {
  // Keep your tickets useState just like you had it!
  const [tickets, setTickets] = useState([]);
  
  // Set up the useReducer here so 'dispatch' is available above the useEffect
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch data on load
  useEffect(() => {
    dispatch({ type: 'FETCH_TICKETS' });
    
    apiClient.get('product')
      .then((response) => {
        setTickets(response.data || []);
      })
      .then(() => {
        dispatch({ type: 'PROCESSING_COMPLETED' });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
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

  // Action: Update Ticket
  const handleUpdateTicket =  (ticketId, updateData) => {
    try {
      //apiClient.put(`/product/${ticketId}`).then((response) => {
     
      }
    catch (error) {
      console.error("Error updating ticket:", error);
    }
  }

  // Action: Delete Ticket
  const handleDeleteTicket = async (ticketId) => {
    const confirmation = window.prompt("Are you sure you want to delete this ticket? Type 'DELETE' to confirm.");
    if (confirmation !== 'DELETE') {
      return;
    }

  // Save a copy of the current state in case we need to roll back
  const originalTickets = [...tickets];

  // Instantly update the UI
  setTickets((prev) => prev.filter((t) => t.id !== ticketId));

  try {
    await apiClient.delete(`/product/${ticketId}`);
  } catch (error) {
   
    alert("Failed to delete. Restoring item.");
    // Revert to original state if the API call fails
    setTickets(originalTickets);
  }
};


  // Action: Update Status
  const handleUpdateStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
  };

  // Bundle everything together to broadcast to your app
  const value = {
    tickets,
    isLoading: state.isLoading, // Now you can pass loading state to your components!
    error: state.error,         // Now you can pass error state to your components!
    addTicket: handleAddTicket,
    updateStatus: handleUpdateStatus,
    updateTicket: handleUpdateTicket, // Expose update function to child components
    deleteTicket: handleDeleteTicket, // Expose delete function to child components
    dispatch // Expose dispatch so child components can trigger state changes
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}

// 4. Create your helper hook
export function useTickets() {
  return useContext(TicketContext);
}
