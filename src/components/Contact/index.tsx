'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {FormEvent, useState} from 'react';
import {FiMail, FiMapPin, FiPhone} from 'react-icons/fi';
import {GrStatusGood} from 'react-icons/gr';
import {MdError} from 'react-icons/md';
import {PhoneNumberInput} from '../PhoneInput';

import cn from 'classnames';
import gs from '../../styles/styles.module.css';
import s from './styles.module.css';

export function Contact() {
    const [step, setStep] = useState<'form' | 'loading' | 'success' | 'error'>('form');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        message: '',
    });

    const validate = () => {
        const newErrors = {
            name: !formData.name.trim() ? 'Введите имя' : '',
            phone: formData.phone.replace(/\D/g, '').length < 10 ? 'Введите корректный номер' : '',
            message: !formData.message.trim() ? 'Введите ваше сообщение' : '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStep('loading');

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStep('success');
            } else {
                setStep('error');
            }
        } catch {
            setStep('error');
        }
    };

    return (
        <div className={cn(gs.glass, gs.container, s.formRoot)}>
            <section id="contacts">
                <h2> {step === 'form' ? 'Свяжитесь с нами' : 'Спасибо за обращение!'} </h2>

                <div className={s.formWrapper}>
                    <AnimatePresence mode="wait">
                        {step === 'form' && (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className={s.contactForm}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.3}}
                            >
                                <div>
                                    <input
                                        name="name"
                                        placeholder="Имя"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                    />
                                    {errors.name && <p className={gs.inputError}>{errors.name}</p>}
                                </div>

                                <div>
                                    <PhoneNumberInput
                                        value={formData.phone}
                                        onChange={(phone) => setFormData(prev => ({...prev, phone}))}
                                        placeholder="Телефон"
                                        required
                                        error={errors.phone}
                                    />
                                </div>

                                <div>
                  <textarea
                      name="message"
                      placeholder="Комментарий"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                  />
                                    {errors.message && <p className={gs.inputError}>{errors.message}</p>}
                                </div>

                                <button type="submit" className={gs.btnPrimary}>
                                    Отправить
                                </button>
                            </motion.form>
                        )}

                        {step === 'loading' && (
                            <motion.div key="loading" className={s.centerStatus} animate={{opacity: 1}}>
                                <div className={gs.loader}></div>
                                <p>Отправка...</p>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div key="success" className={s.centerStatus} animate={{opacity: 1}}>
                                <GrStatusGood size={120} color="green"/>
                                <span>Успешно отправлено!</span>
                            </motion.div>
                        )}

                        {step === 'error' && (
                            <motion.div key="error" className={s.centerStatus} animate={{opacity: 1}}>
                                <MdError size={120} color="red"/>
                                <span>Ошибка при отправке</span>
                                <button className={gs.btnPrimary} onClick={() => setStep('form')}>
                                    Попробовать снова
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={s.contactInfo}>
                    <p><FiMapPin/> г.Нижний Тагил, ул.Аганичева, 107, офис 217</p>
                    <p><FiPhone/> +7 929 21 37 505</p>
                    <p><FiMail/> td-upt@yandex.ru</p>
                </div>
            </section>
        </div>
    );
}
