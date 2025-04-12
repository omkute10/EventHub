const API_BASE = 'http://localhost:3000';

// Auth Functions
export const authAPI = {
  signup: (email: string, password: string, role: string) => 
    fetch(`${API_BASE}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, action: 'signup', role })
    }),
  
  login: (email: string, password: string) =>
    fetch(`${API_BASE}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, action: 'login' })
    })
};

// Event Functions
export const eventAPI = {
  getAll: () => fetch(`${API_BASE}/api/events`).then(res => res.json()),
  create: (eventData: any) => 
    fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
};

// E-Pass Functions
export const epassAPI = {
  generate: (eventId: string, userId: string) =>
    fetch(`${API_BASE}/api/epass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId })
    })
}; 