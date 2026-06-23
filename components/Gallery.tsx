"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";
import { useOrder } from "./OrderProvider";

type Shape = "bag" | "detail" | "shoe" | "travel";
type View = { n: number; alt: string; shape: Shape };

const VIEWS: View[] = [
  { n: 1, alt: "Le Sac de Voyage LUXHE", shape: "bag" },
  { n: 2, alt: "Détail des finitions", shape: "detail" },
  { n: 3, alt: "Compartiment chaussures", shape: "shoe" },
  { n: 4, alt: "En voyage", shape: "travel" },
];

export default function Gallery() {
  const { color } = useOrder();
  const [active, setActive] = useState(0);
  const main = VIEWS[active];
  // Photos par couleur : /images/sac-<couleur>-<n>.jpg (sinon visuel coloré de remplacement)
  const src = (n: number) => `/images/sac-${color}-${n}.jpg`;

  return (
    <div className="gallery">
      <div className="gallery-main">
        <span className="badge-circle">
          <span className="badge-num">100 000+</span>
          <span className="badge-label">VOYAGEURS</span>
        </span>
        <ProductImage key={`${color}-${main.n}`} src={src(main.n)} alt={main.alt} shape={main.shape} color={color} />
      </div>
      <div className="gallery-thumbs">
        {VIEWS.map((v, i) => (
          <button
            key={v.n}
            className={`thumb${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={v.alt}
          >
            <ProductImage key={`${color}-${v.n}`} src={src(v.n)} alt={v.alt} shape={v.shape} color={color} />
          </button>
        ))}
      </div>
    </div>
  );
}
