"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UNIT_PRICE,
  PACK2_PRICE,
  PACK2_OLD,
  formatPrice,
  FORMSPREE_ENDPOINT,
  COLORS,
  type ColorId,
  type Offer,
} from "@/lib/config";

type Ctx = {
  open: () => void;
  color: ColorId;
  setColor: (c: ColorId) => void;
  offer: Offer;
  setOffer: (o: Offer) => void;
  qty: number;
  setQty: (n: number) => void;
};

const OrderContext = createContext<Ctx>({
  open: () => {},
  color: "beige",
  setColor: () => {},
  offer: "single",
  setOffer: () => {},
  qty: 1,
  setQty: () => {},
});

export function useOrder() {
  return useContext(OrderContext);
}

const colorLabel = (id: ColorId) => COLORS.find((c) => c.id === id)?.label ?? id;

/* Sélecteur de couleurs (réutilisé sur la page et dans le formulaire) */
export function ColorSelector() {
  const { color, setColor } = useOrder();
  return (
    <div className="color-select">
      <span className="color-label">Couleur : <b>{colorLabel(color)}</b></span>
      <div className="color-swatches">
        {COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`swatch${color === c.id ? " is-active" : ""}`}
            style={{ background: c.swatch }}
            aria-label={c.label}
            title={c.label}
            aria-pressed={color === c.id}
            onClick={() => setColor(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* Sélecteur d'offre : 1 sac / pack de 2 */
export function OfferSelector() {
  const { offer, setOffer } = useOrder();
  return (
    <div className="offer-select">
      <button
        type="button"
        className={`offer-card${offer === "single" ? " is-active" : ""}`}
        onClick={() => setOffer("single")}
      >
        <span className="offer-radio" />
        <span className="offer-main">
          <b>1 sac</b>
          <span className="offer-price">{formatPrice(UNIT_PRICE)}</span>
        </span>
      </button>
      <button
        type="button"
        className={`offer-card${offer === "pack2" ? " is-active" : ""}`}
        onClick={() => setOffer("pack2")}
      >
        <span className="offer-tag">POPULAIRE · −{formatPrice(PACK2_OLD - PACK2_PRICE)}</span>
        <span className="offer-radio" />
        <span className="offer-main">
          <b>Pack de 2 sacs</b>
          <span className="offer-price">{formatPrice(PACK2_PRICE)} <s>{formatPrice(PACK2_OLD)}</s></span>
        </span>
      </button>
    </div>
  );
}

type SuccessData = {
  prenom: string;
  nom: string;
  telephone: string;
  residence: string;
  offer: Offer;
  color: ColorId;
  qty: number;
  total: number;
};

export default function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState<ColorId>("beige");
  const [offer, setOffer] = useState<Offer>("single");
  const [qty, setQty] = useState(1);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setSuccess(null);
    setError(null);
    setSubmitting(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const clamp = (n: number) => Math.min(20, Math.max(1, isNaN(n) ? 1 : n));
  const isPack = offer === "pack2";
  const effQty = isPack ? 2 : qty;
  const total = isPack ? PACK2_PRICE : qty * UNIT_PRICE;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data: SuccessData = {
      prenom: String(fd.get("prenom") || ""),
      nom: String(fd.get("nom") || ""),
      telephone: String(fd.get("telephone") || ""),
      residence: String(fd.get("residence") || ""),
      offer,
      color,
      qty: effQty,
      total,
    };

    setError(null);
    setSubmitting(true);

    const payload = {
      _subject: `Nouvelle commande LUXHE — ${data.prenom} ${data.nom}`,
      Produit: "Le Sac de Voyage LUXHE 2.0",
      Offre: isPack ? "Pack de 2 sacs" : "1 sac",
      Couleur: colorLabel(color),
      Prénom: data.prenom,
      Nom: data.nom,
      Téléphone: data.telephone,
      "Lieu de résidence": data.residence,
      "Nombre de sacs": effQty,
      Livraison: "Gratuite",
      "Total à payer": formatPrice(total),
    };

    try {
      if (!FORMSPREE_ENDPOINT) {
        console.warn("Formspree non configuré — mode démo :", payload);
        setSuccess(data);
        return;
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      setSuccess(data);
    } catch {
      setError("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OrderContext.Provider value={{ open, color, setColor, offer, setOffer, qty, setQty }}>
      {children}

      {isOpen && (
        <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="orderTitle">
            <button className="modal-close" aria-label="Fermer" onClick={close}>
              ×
            </button>

            {!success ? (
              <div className="modal-body">
                <p className="eyebrow">Le Sac de Voyage LUXHE</p>
                <h2 id="orderTitle">Finalisez votre commande</h2>
                <p className="modal-sub">Remplissez vos informations — vous payez à la livraison.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <span>Votre offre</span>
                    <OfferSelector />
                  </div>

                  <div className="field">
                    <span>Couleur du sac</span>
                    <ColorSelector />
                  </div>

                  <div className="field-grid">
                    <label className="field">
                      <span>Prénom</span>
                      <input type="text" name="prenom" required autoComplete="given-name" placeholder="Votre prénom" />
                    </label>
                    <label className="field">
                      <span>Nom</span>
                      <input type="text" name="nom" required autoComplete="family-name" placeholder="Votre nom" />
                    </label>
                  </div>

                  <label className="field">
                    <span>Téléphone</span>
                    <input type="tel" name="telephone" required autoComplete="tel" placeholder="Pour vous joindre à la livraison" />
                  </label>

                  <label className="field">
                    <span>Lieu de résidence</span>
                    <textarea name="residence" required rows={2} placeholder="Ville, quartier, repère pour la livraison…" />
                  </label>

                  {!isPack && (
                    <label className="field">
                      <span>Nombre de sacs</span>
                      <div className="stepper">
                        <button type="button" className="step-btn" aria-label="Diminuer" onClick={() => setQty(clamp(qty - 1))}>
                          −
                        </button>
                        <input
                          type="number"
                          name="quantite"
                          min={1}
                          max={20}
                          value={qty}
                          inputMode="numeric"
                          onChange={(e) => setQty(clamp(parseInt(e.target.value, 10)))}
                        />
                        <button type="button" className="step-btn" aria-label="Augmenter" onClick={() => setQty(clamp(qty + 1))}>
                          +
                        </button>
                      </div>
                    </label>
                  )}

                  <div className="order-recap">
                    <div className="recap-line"><span>Offre</span><span>{isPack ? "Pack de 2 sacs" : "1 sac"}</span></div>
                    <div className="recap-line"><span>Couleur</span><span>{colorLabel(color)}</span></div>
                    {!isPack && <div className="recap-line"><span>Quantité</span><span>{qty}</span></div>}
                    <div className="recap-line"><span>Livraison</span><span className="free">Gratuite</span></div>
                    <div className="recap-line recap-total"><span>Total à payer</span><span>{formatPrice(total)}</span></div>
                  </div>

                  <button type="submit" className="btn btn-solid btn-block btn-lg" disabled={submitting}>
                    {submitting ? "Envoi en cours…" : "Valider ma commande"}
                  </button>
                  {error && <p className="modal-error">{error}</p>}
                  <p className="modal-note">En validant, vous serez contacté(e) pour confirmer la livraison. Aucun paiement en ligne.</p>
                </form>
              </div>
            ) : (
              <div className="modal-body success-view">
                <span className="success-check">✓</span>
                <h2>Commande enregistrée&nbsp;!</h2>
                <p className="modal-sub">Merci {success.prenom} 👋, votre commande a bien été prise en compte.</p>
                <div className="order-recap">
                  <div className="recap-line"><span>Client</span><span>{success.prenom} {success.nom}</span></div>
                  <div className="recap-line"><span>Téléphone</span><span>{success.telephone}</span></div>
                  <div className="recap-line"><span>Livraison à</span><span>{success.residence}</span></div>
                  <div className="recap-line"><span>Offre</span><span>{success.offer === "pack2" ? "Pack de 2 sacs" : "1 sac"}</span></div>
                  <div className="recap-line"><span>Couleur</span><span>{colorLabel(success.color)}</span></div>
                  <div className="recap-line"><span>Sac(s)</span><span>{success.qty}</span></div>
                  <div className="recap-line"><span>Livraison</span><span className="free">Gratuite</span></div>
                  <div className="recap-line recap-total"><span>Total à payer</span><span>{formatPrice(success.total)}</span></div>
                </div>
                <p className="modal-note">Nous vous contacterons très vite au numéro indiqué pour organiser la livraison gratuite. Vous paierez à la réception.</p>
                <button className="btn btn-outline btn-block" onClick={close}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </OrderContext.Provider>
  );
}
