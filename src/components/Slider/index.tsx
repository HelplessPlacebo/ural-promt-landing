import cn from 'classnames';
import { ReactNode, TouchEventHandler, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import s from './styles.module.css';

type SliderProps = {
  slides: ReactNode[];
};

export function Slider({ slides }: SliderProps) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const prevSlide = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const nextSlide = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  const goToSlide = (i: number) => setCurrent(i);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <>
      <div
        className={s.sliderContainer}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={s.sliderTrack}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides}
        </div>

        <button className={cn(s.sliderArrow, s.sliderArrowLeft)} onClick={prevSlide}>
          <FaChevronLeft size={16} />
        </button>
        <button className={cn(s.sliderArrow, s.sliderArrowRight)} onClick={nextSlide}>
          <FaChevronRight size={16} />
        </button>
      </div>

      <div className={s.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={cn({
              [s.dotsButtonActive]: i === current,
            })}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </>
  );
}
