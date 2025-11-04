import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "УРАЛПРОМТ — ножничные подъёмные платформы GTJZ1012",
    description: "Продажа ножничных самоходных подъёмников GTJZ1012 с гарантией 3 года. Доставка по России и СНГ.",
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body>{children}</body>
        </html>
    );
}
