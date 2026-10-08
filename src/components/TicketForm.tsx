import { useState, useEffect, useRef } from 'react';
import { useTickets } from '../contexts/TicketContext';
import { TicketFormProps } from '../types/ticket';


export default function TicketForm({ 
  inputRef, 
  isEditMode = false, 
  initialData = null, 
  onSuccess 
}: TicketFormProps) {
  // A tiny, temporary storage box to hold the text as the user types
  const [title, setTitle] = useState('');

  const { addTicket, updateTicket } = useTickets();

  // FIXED: Explicitly typed the internal form element ref to prevent runtime check errors
  const formRef = useRef<HTMLFormElement>(null); 

  useEffect(() => {
    // FIXED: Ensured initialData is checked thoroughly to satisfy strict null/undefined configurations
    if (isEditMode && initialData) {
      setTitle(initialData.jobTitle); // Pre-fill the input with the existing ticket title
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stops the browser from reloading the page on submit

    // Don't add anything if the user just typed spaces
    if (!title.trim()) return;
    
    // FIXED: Guard clause ensures initialData exists when executing operations in edit mode
    if (!isEditMode) {
      // Send the typed title up to the main App storage box
      addTicket(title);
    } else if (initialData) {
      updateTicket(initialData.id, { jobTitle: title }); // Call the update function from context
      if (onSuccess) onSuccess(title); // Call the onSuccess callback with the updated title
    }
    // Clear the input box so it is fresh for the next ticket
    clearForm();
  };

  const clearForm = () => {
    setTitle(''); // Clear the input field     
    formRef.current?.reset(); // FIXED: Separated line break safely out of the comment string
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="ticket-form" style={{ display: 'flex', gap: '10px' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter job status/alert title..."
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)} // Keep state updated on every key press
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
        required
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        {isEditMode ? 'Update Job' : 'Add Job'}
      </button>

      <button
        onClick={() => clearForm()} // Clear the input field when clicked
        type="button"
        style={{
          padding: '10px 20px',
          background: '#fff',
          color: '#111111',
          borderColor: '#111111',
          border: 'solid 1px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Clear
      </button>
    </form >
  );
}
