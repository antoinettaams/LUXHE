"use client";

import { useState, useEffect, useRef } from "react";

type Shape = "bag" | "detail" | "shoe" | "travel";

const LABELS: Record<Shape, string> = {
  bag: "Le Sac Weekender",
  detail: "Finitions & dorures",
  shoe: "Compartiment chaussures",
  travel: "En voyage",
};

const PALETTE = {
  cream: "#ece3d4",
  body: "#f3ece0",
  cognac: "#b5572d",
  gold: "#c9a24b",
  strap: "#c0612f",
};

// Visuel de remplacement (sac stylisé) tant qu'aucune vraie photo n'est présente.
function placeholder(shape: Shape): string {
  const tag = LABELS[shape] ?? "LUXHE";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="${PALETTE.cream}"/>
      <g transform="translate(110,210)">
        <rect x="0" y="40" width="380" height="200" rx="46" fill="${PALETTE.body}" stroke="${PALETTE.cognac}" stroke-width="3"/>
        <rect x="150" y="40" width="36" height="200" fill="${PALETTE.strap}"/>
        <rect x="240" y="40" width="36" height="200" fill="${PALETTE.strap}"/>
        <path d="M120 40 q70 -70 140 0" fill="none" stroke="${PALETTE.cognac}" stroke-width="14" stroke-linecap="round"/>
        <rect x="20" y="120" width="340" height="10" rx="5" fill="${PALETTE.gold}"/>
      </g>
      <text x="300" y="430" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="34" fill="${PALETTE.cognac}">LUXHE</text>
      <text x="300" y="465" text-anchor="middle" font-family="Jost, sans-serif" font-size="18" letter-spacing="2" fill="#6b6258">${tag}</text>
      <text x="300" y="540" text-anchor="middle" font-family="Jost, sans-serif" font-size="13" fill="#9b9183">Ajoutez votre photo dans /public/images</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

export default function ProductImage({
  src,
  alt,
  shape,
}: {
  src: string;
  alt: string;
  shape: Shape;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const ref = useRef<HTMLImageElement>(null);

  // L'erreur 404 peut survenir avant l'hydratation (onError manqué) :
  // on vérifie au montage si l'image a déjà échoué.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setImgSrc(placeholder(shape));
    }
  }, [shape]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(placeholder(shape))}
    />
  );
}
