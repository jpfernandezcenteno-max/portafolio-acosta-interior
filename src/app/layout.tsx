import type { Metadata } from "next";
import { Cormorant_Garamond, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acosta Interior — Estudio de Diseño de Interiores",
  description:
    "Portafolio de Acosta Interior. Diseño de interiores que transforma espacios en Lima, Perú.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
