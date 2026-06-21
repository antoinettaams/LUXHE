// Paramètres commerciaux centralisés
export const UNIT_PRICE = 25000; // prix unitaire en FCFA
export const OLD_PRICE = 45000; // prix barré
export const SHIPPING = 0; // livraison gratuite
export const CURRENCY = "F"; // suffixe affiché

export function formatPrice(n: number): string {
  return n.toLocaleString("fr-FR") + " " + CURRENCY;
}

// E-mail destinataire des commandes (pour info / affichage).
export const ORDER_EMAIL = "antoinettaams@gmail.com";

// Identifiant du formulaire Formspree (https://formspree.io/f/XXXXXXX).
// Collez le vôtre dans .env.local : NEXT_PUBLIC_FORMSPREE_ID=xxxxxxx
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
export const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";
