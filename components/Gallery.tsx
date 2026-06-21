"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

type Shape = "bag" | "detail" | "shoe" | "travel";
type Img = { src: string; alt: string; shape: Shape };

const IMAGES: Img[] = [
  { src: "/images/sac-1.jpg", alt: "Le Sac Weekender LUXHE crème et cuir cognac", shape: "bag" },
  { src: "/images/sac-2.jpg", alt: "Détail des finitions", shape: "detail" },
  { src: "/images/sac-3.jpg", alt: "Compartiment chaussures", shape: "shoe" },
  { src: "/images/sac-4.jpg", alt: "En voyage", shape: "travel" },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const main = IMAGES[active];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <span className="badge-circle">
          <span className="badge-num">100 000+</span>
          <span className="badge-label">VOYAGEURS</span>
        </span>
        {/* clé = remonte le composant pour réinitialiser l'état du fallback */}
        <ProductImage key={main.src} src={main.src} alt={main.alt} shape={main.shape} />
      </div>
      <div className="gallery-thumbs">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            className={`thumb${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={img.alt}
          >
            <ProductImage src={img.src} alt={img.alt} shape={img.shape} />
          </button>
        ))}
      </div>
    </div>
  );
}
