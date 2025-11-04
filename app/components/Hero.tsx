"use client";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="hero">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1>Ножничная подъёмная платформа GTJZ1012</h1>
                <p>
                    Самоходная платформа для высотных работ. Надёжная, компактная и безопасная.
                    Рабочая высота — до 12 метров, грузоподъёмность — 320 кг.
                </p>
                <a href="#contacts" className="btn-primary">Получить предложение</a>
            </motion.div>
        </section>
    );
}
