export interface Ticket {
  id: string;
  jobTitle: string;
  user: string;
  status: 'Open' | 'In Progress' |'Resolved' | 'Closed' | string;
  priority: 'Low' | 'Medium' | 'High' | string;
}

export interface TicketFormData {
  jobTitle: string;
  user: string;
  status: 'Open' | 'In Progress' |'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
}