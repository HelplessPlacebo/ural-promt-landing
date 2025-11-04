"use client";
import {useEffect, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import Image from "next/image";

export function Header() {
    const [lastY, setLastY] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            console.log('asdasd')
            const y = window.scrollY;
            if (y > lastY && y > 100) {
                controls.start({y: -100, opacity: 0});
            } else {
                controls.start({y: 0, opacity: 1});
            }
            setLastY(y);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY, controls]);

    return (
        <motion.header
            animate={controls}
            transition={{duration: 0.2}}
            className="header"
        >
            <div className="container flex-between">
                <div className="logo">
                    <Image src="/logo.webp" alt="УРАЛПРОМТ" height={50} width={50}/>
                    <span>УРАЛПРОМТ</span>
                </div>
                <nav>
                    <a href="#specs">Характеристики</a>
                    <a href="#features">Особенности</a>
                    <a href="#gallery">Галерея</a>
                    <a href="#contacts">Контакты</a>
                </nav>
                <a href="#contacts" className="btn-primary">Запросить КП</a>
            </div>
        </motion.header>
    );
}
