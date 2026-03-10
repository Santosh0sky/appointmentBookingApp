import { useEffect, useState } from 'react';
import InputField from './components/InputField.jsx';
import SubmissionList from './components/SubmissionList.jsx';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ username: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ username: '', phone: '', email: '' });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.phone.trim() || !form.email.trim()) {
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/appointments/${editingId}` : '/api/appointments';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to save appointment');
      }

      await fetchAppointments();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (appointment) => {
    setForm({ username: appointment.username, phone: appointment.phone, email: appointment.email });
    setEditingId(appointment.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete appointment');
      }

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="app">
      <h1>BOOKING APPOINTMENT APP</h1>

      <form onSubmit={handleSubmit} className="booking-form">
        <InputField
          label="UserName"
          name="username"
          value={form.username}
          onChange={handleChange}
          autoComplete="name"
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          type="tel"
        />

        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          type="email"
        />

        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Submit'}
        </button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}
      <SubmissionList
        entries={entries}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}
