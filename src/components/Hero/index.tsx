'use client';

import { motion } from 'framer-motion';
import gs from '../../styles/styles.module.css';
import s from './styles.module.css';

export function Hero() {
  return (
    <section className={s.hero}>
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />
      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <h1>Самоходные ножничные платформы для работы на высоте</h1>

        <p>
          Надёжные, безопасные и производительные подъёмники для монтажа, обслуживания и
          строительства.
          <br />
          Модели с высотой до <strong>14 м</strong> и грузоподъёмностью до <strong>450 кг</strong>.
        </p>

        <motion.a
          href="#platforms"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className={gs.btnPrimary}
        >
          Смотреть платформы
        </motion.a>
      </motion.div>
    </section>
  );
}
