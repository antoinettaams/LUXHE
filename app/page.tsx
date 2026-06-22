import { Fragment } from "react";
import OrderProvider from "@/components/OrderProvider";
import OrderButton from "@/components/OrderButton";
import Gallery from "@/components/Gallery";
import ProductImage from "@/components/ProductImage";
import VideoSlot from "@/components/VideoSlot";
import Icon from "@/components/Icon";
import { UNIT_PRICE, OLD_PRICE, formatPrice } from "@/lib/config";

/* Données des sections (faciles à éditer) */

const HERO_BENEFITS = [
  "Contient 38+ vêtements et 5 paires de chaussures",
  "Passe de la bandoulière aux roues en quelques secondes",
  "Chaque tenue arrive sans un seul pli",
  "Évitez l'enregistrement et économisez sur les frais",
];

const FEAT_PHOTOS = [
  { img: "/images/feature-roues.jpg", shape: "bag" as const, tag: "NOUVEAU", title: "Des roues quand vous en avez besoin, des sangles quand vous n'en avez pas besoin.", text: "Passez sans effort du transport à roulettes dans les aéroports au porté épaule confortable. Voyagez léger ou retirez les roues pour un style épuré." },
  { img: "/images/feature-vetements.jpg", shape: "detail" as const, tag: "", title: "Vos vêtements, toujours sans plis (sans exagération)", text: "Grâce au cintre intégré et à la doublure infroissable, vos vêtements arrivent aussi frais que lorsque vous les avez emballés ; inutile de les repasser." },
  { img: "/images/feature-chaussures.jpg", shape: "shoe" as const, tag: "", title: "Un espace dédié rien que pour vos chaussures", text: "Rangez vos chaussures de randonnée, vos talons pour le dîner et vos chaussons confortables dans un seul sac, sans qu'ils touchent vos vêtements. Idéal pour emporter plusieurs paires, en toute simplicité." },
  { img: "/images/feature-cabine.jpg", shape: "travel" as const, tag: "", title: "Se range dans les compartiments à bagages en cabine, sans frais de bagages", text: "Conçu pour respecter les dimensions des bagages cabine, ce bagage vous permet d'éviter les files d'attente à l'enregistrement et de faire des économies. Voyagez plus intelligemment, sans compromis." },
];

const PAINS: [string, string?, string?][] = [
  ["Traîner une ", "valise lourde", " dans la foule ? Pas amusant du tout."],
  ["Vous devez laisser vos ", "tenues préférées", " à la maison ? Je connais ça."],
  ["Rien n'évoque mieux les vacances qu'une robe repassée… sauf quand on n'en a pas."],
  ["Vous payez un supplément pour vos bagages ? Cet argent pourrait servir à acheter des cocktails !"],
];

const CAPACITY = [
  { icon: "dress", title: "10+ jours de tenues", text: "De la place pour chaque look dont vous avez besoin." },
  { icon: "shoe", title: "Plusieurs paires", text: "Talons, baskets et plus encore." },
  { icon: "makeup", title: "Trousse & essentiels", text: "Organisés et faciles à retrouver." },
  { icon: "hanger", title: "Sans aucun pli", text: "Vos tenues restent fraîches et prêtes." },
];

const WHEEL_FEATS = [
  { title: "Poignée télescopique", text: "Roulement fluide, réglable à la hauteur idéale." },
  { title: "Roues à 360°", text: "Roues à fixation rapide pour un roulement facile." },
];

const WHEEL_DETAILS = [
  { title: "Prêt pour les intempéries", text: "Le cuir PU résistant à l'eau protège contre les éclaboussures, la pluie et les imprévus du voyage." },
  { title: "Conçu pour durer", text: "Son tissu résistant et ses coutures de qualité lui permettent de conserver son aspect neuf, où que vous l'emportiez." },
  { title: "Écologique et de haute qualité", text: "Élégant, durable et conçu pour résister à l'épreuve du temps." },
];

const VS_ROWS = [
  "Frais uniques, économisez sur les frais",
  "Convient pour les vêtements de taille 38 et les chaussures de taille 5.",
  "Approuvé pour les bagages à main",
  "Conception anti-rides",
  "Cintre intégré",
  "Roues et poignée détachables",
  "Résistant et étanche",
  "Compartiments d'organisation",
];

const REVIEWS2 = [
  { title: "Les roues ont changé ma façon de voyager 😍", text: "Je redoutais de traîner ma valise dans les aéroports. Avec LUXHE, je clipse les roues et tout glisse tout seul. Les correspondances et les longues marches jusqu'à la porte sont devenues simples.", name: "Aïcha K.", city: "Cotonou" },
  { title: "Enfin un sac qui contient TOUT ce que je veux !", text: "Il contient tous mes essentiels, des chaussures pour chaque occasion et des tenues pour une semaine complète. Je ne laisse plus rien derrière moi. J'ai repris le contrôle de mes valises.", name: "Mariam D.", city: "Abidjan" },
  { title: "Je l'emporte partout, j'en ai fait acheter à toutes mes copines !", text: "J'ai tout essayé pour éviter les plis en voyage, mais le cintre intégré et la doublure anti-froissage fonctionnent vraiment. Mes tenues restent impeccables et prêtes à porter.", name: "Sarah T.", city: "Paris" },
];

const FAQ = [
  ["Passe-t-il vraiment en cabine ?", "Oui ! Le sac est spécialement conçu pour respecter le format cabine de la plupart des compagnies et passer sous le siège. Une question sur votre compagnie ? Écrivez-nous, on vérifie pour vous."],
  ["Comment fonctionnent les retours ?", "Nous sommes certains que vous l'adorerez : vous bénéficiez d'une garantie satisfait ou remboursé de 100 jours. Un message suffit, et on s'occupe du reste."],
  ["Combien de vêtements puis-je emporter ?", "De quoi tenir jusqu'à 10 jours de tenues du quotidien, plus 2 à 3 robes sans plis — parfait pour les séjours prolongés comme pour les occasions variées."],
  ["Est-il imperméable ?", "Oui, le revêtement résistant à l'eau garde vos affaires au sec, à l'abri de la pluie ou des éclaboussures accidentelles."],
  ["En quelle matière est-il fabriqué ?", "En cuir vegan PU haut de gamme : une matière à la fois durable, facile d'entretien et respectueuse de l'environnement, sans matière animale."],
  ["Peut-il vraiment me faire économiser ?", "Oui. En voyageant en cabine, vous évitez les frais de bagage en soute. Sur quelques voyages par an, le sac est vite rentabilisé — et il est pensé pour durer des années."],
];

export default function Home() {
  return (
    <OrderProvider>
      {/* BARRE ANNONCE */}
      <div className="announcebar">
        <div className="announce-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span>✦ Format cabine approuvé sur 100+ compagnies</span>
              <span>✦ 🏆 Meilleur sac de voyage 2026</span>
              <span>✦ Livraison gratuite · Paiement à la livraison</span>
              <span>✦ Jusqu&apos;à −45% aujourd&apos;hui</span>
            </span>
          ))}
        </div>
      </div>

      {/* EN-TÊTE */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">LUXHE</a>
          <nav className="main-nav">
            <a href="#atouts">Le sac</a>
            <a href="#avis">Avis</a>
            <a href="#garantie">Garantie</a>
            <a href="#faq">FAQ</a>
          </nav>
          <OrderButton className="btn btn-solid btn-sm" />
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <Gallery />
            <div className="product-info">
              <div className="pill-row">
                <span className="pill red">🏆 Meilleur sac de voyage 2026</span>
                <span className="pill">Format cabine · 100+ compagnies</span>
                <span className="pill">Cadeaux offerts</span>
              </div>
              <h1>Le Sac de Voyage LUXHE 2.0</h1>
              <div className="rating">
                <span className="stars" aria-label="Noté 4,8 sur 5">★★★★★</span>
                <span className="rating-text">4,8/5 · plus de 500 avis</span>
              </div>
              <p className="lede">
                Voyagez plus léger, plus malin et toujours avec style. Le sac qui
                emporte tout votre dressing sans le moindre pli, et complète chacun de vos looks.
              </p>
              <div className="price-row">
                <span className="price-now">{formatPrice(UNIT_PRICE)}</span>
                <span className="price-old">{formatPrice(OLD_PRICE)}</span>
                <span className="price-tag">−45%</span>
              </div>

              <p className="eyebrow">Pourquoi on l&apos;adore :</p>
              <ul className="quick-benefits">
                {HERO_BENEFITS.map((b) => <li key={b}>{b}</li>)}
              </ul>

              <OrderButton className="btn btn-solid btn-block">Commander maintenant</OrderButton>

              <div className="badges-row">
                <div className="badge-item"><Icon name="users" /><span><strong>500+ clients ravis</strong> Ils partent avec leur LUXHE</span></div>
                <div className="badge-item"><Icon name="shield" /><span><strong>Garantie 30 jours</strong> Satisfait ou remboursé</span></div>
                <div className="badge-item"><Icon name="truck" /><span><strong>Livraison gratuite</strong> Paiement à la livraison</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 FONCTIONNALITÉS (format photo) */}
        <section id="atouts" className="feat-photos">
          <div className="container">
            <h2 className="fp-title">4 fonctionnalités auxquelles vous devriez commencé à penser (sérieusement)</h2>
            <div className="fp-grid">
              {FEAT_PHOTOS.map((f) => (
                <div key={f.title} className="fp-item">
                  <div className="fp-media">
                    <ProductImage src={f.img} alt={f.title} shape={f.shape} />
                  </div>
                  {f.tag && <span className="fp-tag">{f.tag}</span>}
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
            <div className="center" style={{ marginTop: "2.4rem" }}>
              <OrderButton className="btn btn-solid">Je commande mon sac</OrderButton>
            </div>
          </div>
        </section>

        {/* VU DANS + CITATIONS */}
        <section className="trustbar">
          <div className="container trustbar-inner">
            <span>Vu dans</span>
            <strong>VOGUE&amp;CO</strong>
            <strong>ÉLÉGANCE</strong>
            <strong>NOMADE MAG</strong>
            <strong>STYLE VOYAGE</strong>
          </div>
        </section>
        <section className="smart-pack">
          <div className="container sp-grid-wrap">
            <div className="sp-video">
              <VideoSlot src="/videos/smart-packing.mp4" poster="/images/video-poster.jpg" />
            </div>
            <div className="sp-content">
              <h2>Une toute nouvelle façon d&apos;organiser ses bagages intelligemment : espace, style et sans plis</h2>
              <p>
                Faire sa valise ne devrait pas signifier sacrifier son style ni laisser ses
                essentiels derrière soi. Le sac LUXHE donne un tout nouveau sens au voyage léger :
                emportez tout ce que vous aimez, sans l&apos;encombrement.
              </p>
              <div className="sp-items">
                {CAPACITY.map((c) => (
                  <div key={c.title} className="sp-item">
                    <Icon name={c.icon} className="svg-ic" />
                    <div>
                      <h4>{c.title}</h4>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <OrderButton className="btn btn-solid">Configurer mon sac</OrderButton>
              <ul className="sp-trust">
                <li><Icon name="truck" className="svg-ic" /> Livraison gratuite</li>
                <li><Icon name="shield" className="svg-ic" /> Garantie 100 jours</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROBLÈME (fond crème, 4 cartes blanches) */}
        <section className="problem">
          <div className="container">
            <h2>Vous avez toujours du mal à vous débarrasser de sacs trop remplis et encombrants ? Parlons-en.</h2>
            <div className="pain-grid">
              {PAINS.map((p, i) => (
                <div key={i} className="pain-item">
                  <span className="pain-badge"><Icon name="cross" className="svg-ic" /></span>
                  <p>{p[0]}{p[1] && <b>{p[1]}</b>}{p[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENCLENCHEZ-LES (texte + panneau image) */}
        <section className="wheels-hero">
          <div className="container wh-grid">
            <div className="wh-text">
              <h2><span className="wh-hl">Enclenchez-les, roulez en douceur et dites adieu aux efforts physiques intenses.</span></h2>
              <p>
                Fini les efforts pour soulever ou jongler avec des bagages lourds. Fixez les roulettes,
                glissez-vous dans l&apos;aéroport comme si de rien n&apos;était, et une fois vos affaires terminées,
                retirez-les et rangez-les à l&apos;intérieur. C&apos;est aussi simple que ça : sans outils, sans stress,
                voyagez en toute sérénité.
              </p>
              <OrderButton className="btn btn-solid btn-lg">Configurez votre sac</OrderButton>
              <ul className="wh-trust">
                <li><Icon name="truck" className="svg-ic" /> Livraison rapide</li>
                <li><span className="sep" /></li>
                <li><Icon name="shield" className="svg-ic" /> Garantie de remboursement de 100 jours</li>
              </ul>
            </div>
            <div className="wheel-panel">
              <div className="wheel-feats">
                {WHEEL_FEATS.map((f) => (
                  <div key={f.title} className="wheel-feat">
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
              <div className="wheel-img">
                <ProductImage src="/images/roues-demo.jpg" alt="Poignée télescopique et roues du sac" shape="travel" />
              </div>
            </div>
          </div>
        </section>

        {/* CARACTÉRISTIQUES (texte + collage images) */}
        <section className="wheels-detail">
          <div className="container wd-grid">
            <div className="wd-list">
              {WHEEL_DETAILS.map((d) => (
                <div key={d.title} className="wd-item">
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
            <div className="wd-collage">
              <div className="big"><ProductImage src="/images/durabilite-1.jpg" alt="Le sac en situation de voyage" shape="travel" /></div>
              <div className="small"><ProductImage src="/images/durabilite-2.jpg" alt="Détail du sac" shape="detail" /></div>
              <div className="small"><ProductImage src="/images/durabilite-3.jpg" alt="Texture du cuir" shape="detail" /></div>
            </div>
          </div>
        </section>

        {/* COMPARATIF NOUS CONTRE EUX (fond blanc, colonne LUXHE en bandeau sombre) */}
        <section className="vs-comp">
          <div className="container">
            <h2>Pas seulement meilleur, supérieur en tout point</h2>
            <div className="vs-card">
              <h2 className="vsc-title">Nous contre eux</h2>
              <div className="vsc-grid">
                <div className="vsc-h feat"></div>
                <div className="vsc-h luxe">LUXHE</div>
                <div className="vsc-h other">Autres marques</div>
                {VS_ROWS.map((feat, i) => (
                  <Fragment key={feat}>
                    <div className="vsc-feat">{feat}</div>
                    <div className={`vsc-c luxe${i === VS_ROWS.length - 1 ? " last" : ""}`}>
                      <span className="vsc-badge"><Icon name="check" className="svg-ic" /></span>
                    </div>
                    <div className="vsc-c other">
                      <span className="vsc-badge"><Icon name="cross" className="svg-ic" /></span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="vsc-foot">
              <OrderButton className="btn btn-solid">Configurez votre sac</OrderButton>
              <ul className="vsc-trust">
                <li><Icon name="users" className="svg-ic" /> Plus de 500 exemplaires vendus</li>
                <li><Icon name="shield" className="svg-ic" /> Garantie de remboursement de 30 jours</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES DÉTAILLÉS */}
        <section id="avis" className="reviews2">
          <div className="container">
            <h2 className="section-title">Plus de 500 voyageurs ne peuvent pas se tromper…</h2>
            <p className="section-sub">Noté 4,8/5 sur plus de 350 avis</p>
            <div className="review2-grid">
              {REVIEWS2.map((r) => (
                <div key={r.name} className="review2-card">
                  <span className="stars">★★★★★</span>
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                  <div className="review2-meta">
                    <span className="name">{r.name}</span> · <span className="city">{r.city}</span>
                    <br /><span className="verified">Achat vérifié</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GARANTIE */}
        <section id="garantie" className="guarantee">
          <div className="container guarantee-inner">
            <span className="seal">30<small>JOURS</small></span>
            <div>
              <h2>Satisfait ou remboursé pendant 30 jours</h2>
              <p>
                Essayez le Sac de Voyage LUXHE sans risque. S&apos;il ne vous convient pas,
                on vous rembourse — simplement. Et vous ne payez qu&apos;à la livraison :
                vous voyez votre sac avant de régler.
              </p>
              <OrderButton className="btn btn-solid">Commander sans risque</OrderButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="faq">
          <div className="container">
            <h2 className="section-title">Vos questions, nos réponses</h2>
            <div className="faq-list">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* PROMESSE LUXHE */}
        <section className="promise">
          <div className="container">
            <h2 className="section-title">La promesse LUXHE</h2>
            <div className="promise-row">
              <div className="promise-item"><Icon name="truck" className="svg-ic big" /><h4>Livraison gratuite</h4><p>Expédition rapide et soignée, partout.</p></div>
              <div className="promise-item"><Icon name="users" className="svg-ic big" /><h4>500+ sacs vendus</h4><p>L&apos;accessoire de voyage incontournable.</p></div>
              <div className="promise-item"><Icon name="chat" className="svg-ic big" /><h4>Support 7j/7</h4><p>Une équipe à votre écoute, rien que pour vous.</p></div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final-cta">
          <div className="container">
            <h2>Votre prochain départ commence ici.</h2>
            <p>Rejoignez plus de 500 voyageurs qui ne partent plus sans leur LUXHE.</p>
            <OrderButton className="btn btn-light btn-lg">Commander mon Sac de Voyage</OrderButton>
            <p className="cta-note">Livraison gratuite · Paiement à la livraison · Garantie 30 jours</p>
          </div>
        </section>
      </main>

      {/* PIED DE PAGE (inchangé) */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="brand">LUXHE</span>
            <p>Le compagnon de voyage des aventuriers modernes.</p>
          </div>
          <div className="footer-links">
            <a href="#atouts">Le sac</a>
            <a href="#avis">Avis</a>
            <a href="#garantie">Garantie</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <p className="footer-copy">© 2026 LUXHE. Tous droits réservés.</p>
      </footer>
    </OrderProvider>
  );
}
