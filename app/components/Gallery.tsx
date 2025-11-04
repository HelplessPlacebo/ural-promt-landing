"use client";
import {TouchEventHandler, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";

type Slide = {
    src: string;
    type: "image" | "video";
};

const slides: Slide[] = [
    {src: "/platform1.jpg", type: "image"},
    {src: "/platform2.jpg", type: "image"},
    {src: "/video1.mp4", type: "video"},
    {src: "/platform3.jpg", type: "image"},
    {src: "/platform4.jpg", type: "image"},
];

export function Gallery() {
    const [current, setCurrent] = useState(0);
    const [modal, setModal] = useState<Slide | null>(null);
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

    // ESC listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setModal(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <section id="gallery" className="section">
            <h2>Галерея</h2>

            <div
                className="slider-container"
                ref={sliderRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="slider-track"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                    }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="slide">
                            {slide.type === "image" ? (
                                <Image
                                    src={slide.src}
                                    height={500}
                                    width={500}
                                    alt={`Slide ${i + 1}`}
                                    onClick={() => setModal(slide)}
                                    className="gallery-img"
                                />
                            ) : (
                                <video
                                    src={slide.src}
                                    className="gallery-video"
                                    controls
                                    preload="metadata"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <button className="slider-arrow left" onClick={prevSlide}>
                    &lt;
                </button>
                <button className="slider-arrow right" onClick={nextSlide}>
                    &gt;
                </button>
            </div>

            <div className="dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={i === current ? "active" : ""}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {modal && (
                    <motion.div
                        className="modal"
                        onClick={() => setModal(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        <motion.div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            transition={{duration: 0.3}}
                            style={{position: "relative"}}
                        >
                            <button
                                onClick={() => setModal(null)}
                                className='modal-close-button'
                            >
                                &times;
                            </button>

                            {modal.type === "image" ? (
                                <img
                                    alt="modal-img"
                                    src={modal.src}
                                    className='modal-content'
                                />
                            ) : (
                                <video
                                    src={modal.src}
                                    controls
                                    autoPlay
                                    className='modal-content'
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
