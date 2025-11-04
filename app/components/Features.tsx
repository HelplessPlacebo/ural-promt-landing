"use client";
import {useState} from "react";
import {FiChevronDown} from "react-icons/fi";

const items = [
    {title: "Компактность", text: "Малый радиус поворота позволяет работать в ограниченных пространствах."},
    {title: "Удлинённая платформа", text: "Педальная выдвижная секция обеспечивает доступ к рабочей зоне."},
    {title: "Безопасность", text: "Автоматическая блокировка дверей, защита гидролиний, аварийная остановка и диагностика неисправностей."},
    {title: "Обслуживание", text: "Поворотная база, стандартизованные отверстия для погрузчика, простая диагностика по кодам ошибок."},
    {title: "Гарантия", text: "3 года на основные узлы и 1 год на всю машину. Быстрая сервисная поддержка."},
];

export function Features() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="features" className="section">
            <h2>Особенности конструкции</h2>
            <div className="accordion">
                {items.map((item, i) => (
                    <div key={i} className={`accordion-item ${open === i ? "open" : ""}`}>
                        <button onClick={() => setOpen(open === i ? null : i)} className="flex-between">
                            {item.title}
                            <FiChevronDown className={`accordion-icon ${open === i ? "open" : ""}`}/>
                        </button>
                        <div className="accordion-content">
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
