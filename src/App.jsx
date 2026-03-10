import { useState } from 'react';
import InputField from './components/InputField.jsx';
import SubmissionList from './components/SubmissionList.jsx';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ username: '', phone: '', email: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.phone.trim() || !form.email.trim()) {
      return;
    }

    setEntries((prev) => [...prev, { ...form }]);
    setForm({ username: '', phone: '', email: '' });
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
          Submit
        </button>
      </form>

      <SubmissionList entries={entries} />
    </main>
  );
}
