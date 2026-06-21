// Jeu d'icônes SVG inline (style ligne, couleur via currentColor).
type Props = { name: string; className?: string };

const P: Record<string, React.ReactNode> = {
  check: <path d="M20 6 9 17l-5-5" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  wheels: (
    <>
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="M7 14V6h9l1 8M4 6h3" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 7a2 2 0 1 1 1.4 1.9c-.5.2-.9.6-.9 1.1v.5" />
      <path d="M12 10.5 4 16.5a1 1 0 0 0 .6 1.8h14.8a1 1 0 0 0 .6-1.8L12 10.5Z" />
    </>
  ),
  shoe: (
    <>
      <path d="M3 16v-4l5-1 3 2 7 1c2 .3 3 1.3 3 3v1H3Z" />
      <path d="M3 16v2h18M8 11l1.5 2" />
    </>
  ),
  plane: <path d="M10.2 4.3a1.5 1.5 0 0 1 2.6 0l2 5.2 5.7 1.8c.9.3.9 1.6 0 1.9l-5.7 1.8-2 5.2a1.5 1.5 0 0 1-2.6 0l-2-5.2-5.7-1.8c-.9-.3-.9-1.6 0-1.9l5.7-1.8 2-5.2Z" opacity="0" />,
  carryon: (
    <>
      <rect x="6" y="7" width="12" height="14" rx="2" />
      <path d="M9 7V4h6v3M9 11v6M15 11v6" />
    </>
  ),
  strap: (
    <>
      <path d="M7 8a5 5 0 0 1 10 0" />
      <rect x="6" y="8" width="12" height="12" rx="2" />
    </>
  ),
  water: <path d="M12 3s6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 6-10 6-10Z" />,
  leaf: (
    <>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14a6 6 0 0 1-1-1Z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.2 3 7.5 7 9 4-1.5 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-4-5.6" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  ruler: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </>
  ),
  dress: (
    <>
      <path d="M10 3c0 1.5 4 1.5 4 0" />
      <path d="M10 3 8 8l2 1-2 4 4 7 4-7-2-4 2-1-2-5" />
    </>
  ),
  makeup: (
    <>
      <rect x="9" y="9" width="6" height="12" rx="1.5" />
      <path d="M11 9 9.5 4h5L13 9" />
    </>
  ),
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />,
  handle: (
    <>
      <path d="M8 4h8v4H8z" />
      <path d="M10 8v9a2 2 0 0 0 4 0V8" />
    </>
  ),
};

export default function Icon({ name, className = "svg-ic" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name] ?? P.check}
    </svg>
  );
}
