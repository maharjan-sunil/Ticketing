import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from './pages/DashboardView';
import TicketDetailView from './pages/TicketDetailView';
import './App.css';

function Header() {
  return (
    <header className="app-header">
      <h1>🎟️ TicketAlert Dashboard</h1>
      <p>Real-time job status tracking</p>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        
        <Routes>
          {/* Main Dashboard Route */}
          <Route path="/" element={<DashboardView />} />
          
          {/* Dynamic Details Route */}
          <Route path="/ticket/:id" element={<TicketDetailView />} />
          
          {/* Fallback to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
