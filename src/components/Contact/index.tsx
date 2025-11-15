'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { GrStatusGood } from 'react-icons/gr';
import { MdError } from 'react-icons/md';
import { PhoneNumberInput } from '../PhoneInput';

import cn from 'classnames';
import gs from '../../styles/styles.module.css';
import s from './styles.module.css';

export function Contact() {
  const [step, setStep] = useState<'form' | 'loading' | 'success' | 'error'>('form');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) return 'Введите корректный номер телефона';
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    } else {
      setPhoneError(null);
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    (data as any).phone = phone;

    setStep('loading');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStep('success');
        form.reset();
        setPhone('');
      } else {
        setStatus('Ошибка при отправке.');
        setStep('error');
      }
    } catch (err) {
      setStatus('Ошибка при отправке.');
      setStep('error');
    }
  };

  return (
    <div className={cn(gs.glass, gs.container)}>
      <section id="contacts">
        <h2>Свяжитесь с нами</h2>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className={s.contactForm}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <input name="name" placeholder="Имя" required />

              <PhoneNumberInput
                value={phone}
                onChange={setPhone}
                placeholder="Телефон"
                required
                error={phoneError}
              />

              <textarea name="message" placeholder="Комментарий" />

              <button type="submit" className={gs.btnPrimary}>
                Отправить
              </button>
            </motion.form>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              className={cn(s.contactForm, gs.flexCenter)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <div className={gs.loader}></div>
              <p>Отправка...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              className={cn(s.contactForm, gs.flexCenter)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <div className={s.contactFormStatus}>
                <GrStatusGood color="green" size={120} />
                <span>Ваше обращение успешно отправлено!</span>
              </div>
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div
              key="error"
              className={cn(s.contactForm, gs.flexCenter)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <div className={s.contactFormStatus}>
                <MdError color="red" size={120} />
                <span>{status}</span>
              </div>
              <button className={gs.btnPrimary} onClick={() => setStep('form')}>
                Попробовать снова
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={s.contactInfo}>
          <p>
            <FiMapPin /> г.Нижний Тагил, ул.Аганичева, стр.107, офис217
          </p>
          <p>
            <FiPhone /> +7 929 21 37 505
          </p>
          <p>
            <FiMail /> td‑upt@yandex.ru
          </p>
        </div>
      </section>
    </div>
  );
}
