import React from 'react';

export default function SubmissionList({ entries }) {
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
        {entries.map((entry, idx) => (
          <li key={idx} className="submission-item">
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
          </li>
        ))}
      </ul>
    </section>
  );
}
