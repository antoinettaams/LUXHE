"use client";

import { useState, useEffect, useRef } from "react";
import { COLORS, type ColorId } from "@/lib/config";

type Shape = "bag" | "detail" | "shoe" | "travel";

const LABELS: Record<Shape, string> = {
  bag: "Le Sac Weekender",
  detail: "Finitions & dorures",
  shoe: "Compartiment chaussures",
  travel: "En voyage",
};

// Visuel de remplacement (sac stylisé) tant qu'aucune vraie photo n'est présente.
function placeholder(shape: Shape, color: ColorId): string {
  const c = COLORS.find((x) => x.id === color) ?? COLORS[0];
  const tag = LABELS[shape] ?? "LUXHE";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="#f4eee9"/>
      <g transform="translate(110,210)">
        <rect x="0" y="40" width="380" height="200" rx="46" fill="${c.body}" stroke="${c.strap}" stroke-width="3"/>
        <rect x="150" y="40" width="36" height="200" fill="${c.strap}"/>
        <rect x="240" y="40" width="36" height="200" fill="${c.strap}"/>
        <path d="M120 40 q70 -70 140 0" fill="none" stroke="${c.strap}" stroke-width="14" stroke-linecap="round"/>
        <rect x="20" y="120" width="340" height="10" rx="5" fill="${c.zip}"/>
      </g>
      <text x="300" y="430" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="34" fill="${c.text}">LUXHE</text>
      <text x="300" y="465" text-anchor="middle" font-family="Jost, sans-serif" font-size="18" letter-spacing="2" fill="#6b6258">${tag}</text>
      <text x="300" y="540" text-anchor="middle" font-family="Jost, sans-serif" font-size="13" fill="#9b9183">Ajoutez votre photo dans /public/images</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

export default function ProductImage({
  src,
  alt,
  shape,
  color = "beige",
}: {
  src: string;
  alt: string;
  shape: Shape;
  color?: ColorId;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const ref = useRef<HTMLImageElement>(null);

  // Si la vraie photo (src) est absente → on bascule sur le visuel coloré.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setImgSrc(placeholder(shape, color));
    }
  }, [shape, color]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(placeholder(shape, color))}
    />
  );
}
