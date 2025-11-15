'use client';

import cn from 'classnames';
import {motion} from 'framer-motion';
import type {MouseEvent} from 'react';
import {useEffect, useRef, useState} from 'react';
import gs from '../../styles/styles.module.css';
import s from './styles.module.css';

const NAV_LINKS = [
    {
        id: 'platforms',
        label: 'Платформы',
    },
    {
        id: 'gallery',
        label: 'Галерея',
    },
    {
        id: 'contacts',
        label: 'Контакты',
    },
];

export function Header() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1024px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (Math.abs(currentY - lastScrollY.current) < 15) return;
            setHidden(currentY > lastScrollY.current && currentY > 120);
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    useEffect(() => {
        const headings = NAV_LINKS.map((l) => document.querySelector(`#${l.id} h2`)).filter(
            Boolean
        ) as HTMLElement[];

        if (!headings.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 1) {
                        setActiveSection(entry.target.closest('section')?.id || '');
                    }
                });
            },
            {
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        headings.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (e: MouseEvent, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            history.pushState(null, '', `#${id}`);
            setActiveSection(id);
        }
    };

    return (
        <motion.header
            initial={{
                y: 0,
                opacity: 1,
            }}
            animate={{
                y: hidden ? '-100%' : '0%',
                clipPath: hidden ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)'
            }}

            transition={{
                duration: 0.35,
                ease: 'easeInOut',
            }}
            className={s.header}
        >
            <div className={cn(gs.container, gs.flexBetween)}>
                <div className={s.headerLogo}>
                    <img src="/logo.webp" alt="УРАЛПРОМТ"/>
                    <span>УРАЛПРОМТ</span>
                </div>

                <nav>
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={(e) => handleNavClick(e, l.id)}
                            className={cn({[s.active]: activeSection === l.id})}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <a href="#contacts" className={gs.btnPrimary}>
                    Запросить КП
                </a>
            </div>
        </motion.header>
    );
}
