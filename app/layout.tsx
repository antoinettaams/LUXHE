import type { Metadata } from "next";
import { Fjalla_One, Poppins } from "next/font/google";
import "./globals.css";

// Mêmes polices que le site concurrent : Fjalla One (grands titres) + Poppins (texte).
const heading = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXHE — Le Sac Weekender | Le compagnon de voyage des aventuriers modernes",
  description:
    "Le Sac Weekender LUXHE : élégant, spacieux, avec compartiment chaussures séparé. Adopté par plus de 100 000 voyageurs. Livraison gratuite, paiement à la livraison.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
