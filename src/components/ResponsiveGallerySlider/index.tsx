'use client';

import {ReactNode, useRef} from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import s from './styles.module.css';

type Item = {
    src: string;
    type: 'image' | 'video';
    element: ReactNode;
};

type Props = {
    items: Item[];
};

export function ResponsiveGallerySlider({items}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollByAmount = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({left: dir === 'left' ? -amount : amount, behavior: 'smooth'});
    };

    return (
        <div className={s.wrapper}>
            <button className={s.arrowLeft} onClick={() => scrollByAmount('left')}>
                <FaChevronLeft size={16}/>
            </button>

            <div className={s.scroller} ref={scrollRef}>
                {items.map((item, i) => (
                    <div key={item.src + i} className={s.card}>
                        {item.element}
                    </div>
                ))}
            </div>

            <button className={s.arrowRight} onClick={() => scrollByAmount('right')}>
                <FaChevronRight size={16}/>
            </button>
        </div>
    );
}
