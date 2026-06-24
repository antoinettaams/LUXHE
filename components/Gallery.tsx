"use client";

import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import { useOrder } from "./OrderProvider";
import type { ColorId } from "@/lib/config";

type Shape = "bag" | "detail" | "shoe" | "travel";
type Img = { src: string; alt: string; shape: Shape };

// Photos par couleur. La 1re de chaque liste est l'image principale ("…-main").
// Beige n'a pas de "-main" : on utilise beige-1 comme image principale.
const GALLERY: Record<ColorId, Img[]> = {
  beige: [
    { src: "/images/beige-main.png", alt: "Le Sac de Voyage LUXHE beige", shape: "bag" },
    { src: "/images/beige-1.png", alt: "Le Sac de Voyage LUXHE beige", shape: "bag" },
    { src: "/images/beige-2.png", alt: "Sac LUXHE beige — autre vue", shape: "detail" },
    { src: "/images/beige-3.png", alt: "Sac LUXHE beige — détail", shape: "shoe" },
  ],
  rose: [
    { src: "/images/rose-main.png", alt: "Le Sac de Voyage LUXHE rosé", shape: "bag" },
    { src: "/images/rose-1.png", alt: "Sac LUXHE rosé — autre vue", shape: "detail" },
    { src: "/images/rose-2.png", alt: "Sac LUXHE rosé — détail", shape: "shoe" },
    { src: "/images/rose-3.png", alt: "Sac LUXHE rosé — en situation", shape: "travel" },
  ],
  noir: [
    { src: "/images/noir-main.png", alt: "Le Sac de Voyage LUXHE noir", shape: "bag" },
    { src: "/images/noir-1.png", alt: "Sac LUXHE noir — autre vue", shape: "detail" },
    { src: "/images/noir-2.png", alt: "Sac LUXHE noir — détail", shape: "shoe" },
    { src: "/images/noir-3.png", alt: "Sac LUXHE noir — en situation", shape: "travel" },
  ],
};

export default function Gallery() {
  const { color } = useOrder();
  const [active, setActive] = useState(0);

  // À chaque changement de couleur, on revient à l'image principale.
  useEffect(() => setActive(0), [color]);

  const imgs = GALLERY[color];
  const idx = Math.min(active, imgs.length - 1);
  const main = imgs[idx];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <span className="badge-circle">
          <span className="badge-num">500+</span>
          <span className="badge-label">VOYAGEURS</span>
        </span>
        <ProductImage key={main.src} src={main.src} alt={main.alt} shape={main.shape} color={color} />
      </div>
      <div className="gallery-thumbs">
        {imgs.map((v, i) => (
          <button
            key={v.src}
            className={`thumb${i === idx ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={v.alt}
          >
            <ProductImage src={v.src} alt={v.alt} shape={v.shape} color={color} />
          </button>
        ))}
      </div>
    </div>
  );
}
