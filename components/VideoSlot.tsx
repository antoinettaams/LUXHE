"use client";

import { useState, useEffect } from "react";

// Affiche la vidéo si le fichier existe, sinon un emplacement stylisé prêt à recevoir la vidéo.
export default function VideoSlot({ src, poster }: { src: string; poster?: string }) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let on = true;
    fetch(src, { method: "HEAD" })
      .then((r) => on && setExists(r.ok))
      .catch(() => on && setExists(false));
    return () => {
      on = false;
    };
  }, [src]);

  if (exists) {
    return (
      <video className="video-slot" controls playsInline poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="video-slot placeholder">
      <span className="play">▶</span>
      <strong>Emplacement vidéo</strong>
      <span>
        Déposez votre vidéo dans
        <br />
        <code>public/videos/smart-packing.mp4</code>
      </span>
    </div>
  );
}
