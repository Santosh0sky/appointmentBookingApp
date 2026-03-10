import React from 'react';

export default function SubmissionList({ entries, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <section className="list-area">
        <h2>Submitted Appointments</h2>
        <p className="empty">Loading…</p>
      </section>
    );
  }

  if (entries.length === 0) {
    return (
      <section className="list-area">
        <h2>Submitted Appointments</h2>
        <p className="empty">No appointments yet — submit the form above.</p>
      </section>
    );
  }

  return (
    <section className="list-area" aria-live="polite">
      <h2>Submitted Appointments</h2>
      <ul className="submission-list">
        {entries.map((entry) => (
          <li key={entry.id} className="submission-item">
            <div>
              <span className="label">UserName:</span>
              <span>{entry.username}</span>
            </div>
            <div>
              <span className="label">Phone Number:</span>
              <span>{entry.phone}</span>
            </div>
            <div>
              <span className="label">Email:</span>
              <span>{entry.email}</span>
            </div>
            <div className="actions">
              <button type="button" className="action-btn" onClick={() => onEdit(entry)}>
                Edit
              </button>
              <button type="button" className="action-btn delete" onClick={() => onDelete(entry.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
