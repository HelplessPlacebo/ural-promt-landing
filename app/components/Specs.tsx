"use client";
import {motion} from "framer-motion";
import {FiDownload} from "react-icons/fi";

export function Specs() {
    return (
        <section id="specs" className="section glass">
            <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}}>
                Технические характеристики
            </motion.h2>
            <table className="specs-table">
                <tbody>
                <tr>
                    <th>Модель</th>
                    <td>GTJZ1012</td>
                </tr>
                <tr>
                    <th>Грузоподъёмность</th>
                    <td>320 кг</td>
                </tr>
                <tr>
                    <th>Рабочая высота (H2)</th>
                    <td>12 м / 39.3 фт</td>
                </tr>
                <tr>
                    <th>Масса</th>
                    <td>2510 кг</td>
                </tr>
                <tr>
                    <th>Скорость движения</th>
                    <td>3.5 км/ч (сложено), 0.8 км/ч (поднято)</td>
                </tr>
                <tr>
                    <th>Двигатель</th>
                    <td>24В / 3.3 кВт</td>
                </tr>
                <tr>
                    <th>Аккумулятор</th>
                    <td>4×6В / 200 А·ч</td>
                </tr>
                <tr>
                    <th>Габариты</th>
                    <td>2480×1190×2450 мм</td>
                </tr>
                </tbody>
            </table>
            <div className='div-full'>
                <a href="/specs.pdf" download className="btn-primary btn-full">
                    <FiDownload/> Скачать PDF
                </a>
            </div>
        </section>
    );
}
