import React from 'react';

export default function InputField({ label, name, value, onChange, type = 'text', autoComplete }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="field__input"
        name={name}
        value={value}
        onChange={onChange}
        required
        autoComplete={autoComplete}
        type={type}
      />
    </label>
  );
}
