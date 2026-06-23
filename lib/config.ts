// Paramètres commerciaux centralisés
export const UNIT_PRICE = 40000; // prix unitaire en FCFA
export const OLD_PRICE = 72000; // prix barré unitaire
export const PACK2_PRICE = 70000; // pack de 2 sacs
export const PACK2_OLD = 80000; // prix de référence (2 × 40 000)
export const SHIPPING = 0; // livraison gratuite
export const CURRENCY = "F"; // suffixe affiché

export function formatPrice(n: number): string {
  return n.toLocaleString("fr-FR") + " " + CURRENCY;
}

// Réduction unitaire affichée (calculée)
export const DISCOUNT_PCT = Math.round((1 - UNIT_PRICE / OLD_PRICE) * 100);

// Offres disponibles
export type Offer = "single" | "pack2";

// Couleurs du sac (sélecteur + recoloration du visuel de remplacement)
export type ColorId = "beige" | "rose" | "noir";
export const COLORS: {
  id: ColorId;
  label: string;
  swatch: string; // pastille du sélecteur
  body: string; // corps du sac
  strap: string; // sangles / anses
  zip: string; // fermeture dorée
  text: string; // couleur du logo sur le visuel
}[] = [
  { id: "beige", label: "Beige", swatch: "#e7d9c0", body: "#ece3d4", strap: "#b5572d", zip: "#c9a24b", text: "#b5572d" },
  { id: "rose", label: "Rosé", swatch: "#e6c3bd", body: "#eccdc8", strap: "#c07d70", zip: "#c9a24b", text: "#b06a5d" },
  { id: "noir", label: "Noir", swatch: "#2b2b2b", body: "#2e2c2b", strap: "#171615", zip: "#c9a24b", text: "#c9a24b" },
];

// E-mail destinataire des commandes (pour info / affichage).
export const ORDER_EMAIL = "antoinettaams@gmail.com";

// Identifiant du formulaire Formspree (https://formspree.io/f/XXXXXXX).
// Collez le vôtre dans .env.local : NEXT_PUBLIC_FORMSPREE_ID=xxxxxxx
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
export const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";
