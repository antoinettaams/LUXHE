"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UNIT_PRICE, SHIPPING, formatPrice, FORMSPREE_ENDPOINT } from "@/lib/config";

type Ctx = { open: () => void };
const OrderContext = createContext<Ctx>({ open: () => {} });

export function useOrder() {
  return useContext(OrderContext);
}

type SuccessData = {
  prenom: string;
  nom: string;
  telephone: string;
  residence: string;
  qty: number;
  total: number;
};

export default function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setSuccess(null);
    setError(null);
    setSubmitting(false);
    setQty(1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Verrouille le scroll de la page + fermeture à la touche Échap
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
  const total = qty * UNIT_PRICE + SHIPPING;

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
      qty,
      total,
    };

    setError(null);
    setSubmitting(true);

    // Champs lisibles dans l'e-mail reçu via Formspree.
    const payload = {
      _subject: `Nouvelle commande LUXHE — ${data.prenom} ${data.nom}`,
      Produit: "Le Sac Weekender LUXHE",
      Prénom: data.prenom,
      Nom: data.nom,
      Téléphone: data.telephone,
      "Lieu de résidence": data.residence,
      "Nombre de sacs": data.qty,
      "Prix unitaire": formatPrice(UNIT_PRICE),
      Livraison: "Gratuite",
      "Total à payer": formatPrice(data.total),
    };

    try {
      if (!FORMSPREE_ENDPOINT) {
        // Formspree pas encore configuré : mode démo (voir SETUP-EMAIL.txt).
        console.warn("Formspree non configuré — commande affichée en local :", payload);
      } else {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Échec de l'envoi");
      }
      setSuccess(data);
    } catch {
      setError("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OrderContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="orderTitle">
            <button className="modal-close" aria-label="Fermer" onClick={close}>
              ×
            </button>

            {!success ? (
              <div className="modal-body">
                <p className="eyebrow">Le Sac Weekender LUXHE</p>
                <h2 id="orderTitle">Finalisez votre commande</h2>
                <p className="modal-sub">Remplissez vos informations — vous payez à la livraison.</p>

                <form onSubmit={handleSubmit} noValidate>
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

                  <label className="field">
                    <span>Nombre de sacs</span>
                    <div className="stepper">
                      <button type="button" className="step-btn" aria-label="Diminuer" onClick={() => setQty((q) => clamp(q - 1))}>
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
                      <button type="button" className="step-btn" aria-label="Augmenter" onClick={() => setQty((q) => clamp(q + 1))}>
                        +
                      </button>
                    </div>
                  </label>

                  <div className="order-recap">
                    <div className="recap-line"><span>Prix unitaire</span><span>{formatPrice(UNIT_PRICE)}</span></div>
                    <div className="recap-line"><span>Quantité</span><span>{qty}</span></div>
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
                  <div className="recap-line"><span>Sac(s)</span><span>{success.qty} × {formatPrice(UNIT_PRICE)}</span></div>
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
