'use client';

import { ChangeEvent } from 'react';
import s from './styles.module.css';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
}

export function PhoneNumberInput({
  value,
  onChange,
  placeholder,
  required,
  error,
}: PhoneNumberInputProps) {
  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '');

    if (!digits) return '';

    let formatted = '+';
    if (digits.startsWith('7') || digits.startsWith('8')) {
      formatted += digits.slice(0, 1); // +7
      if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
      if (digits.length >= 5) formatted += ') ' + digits.slice(4, 7);
      if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
      if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
    } else {
      formatted += digits;
    }

    return formatted;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  };

  return (
    <div className={s.phoneInputRoot}>
      <input
        type="tel"
        value={formatPhone(value)}
        onChange={handleChange}
        placeholder={placeholder || 'Телефон'}
        required={required}
        className={s.phoneInput}
      />
      {error && <p className={s.inputError}>{error}</p>}
    </div>
  );
}
