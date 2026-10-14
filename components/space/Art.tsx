/* Lightweight inline SVG art for the space decorations (no filters, no JS). */
type P = { className?: string; style?: React.CSSProperties };

export function MiniAstronaut({ className = "", style, visor = "#2454d7", accent = "#c23b91" }: P & { visor?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M30 58c-10 2-16 11-19 24l13 6 9-16Z" fill="#c7d2fe" stroke="#17213d" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M90 58c10 2 16 11 19 24l-13 6-9-16Z" fill="#c7d2fe" stroke="#17213d" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="34" y="62" width="52" height="50" rx="16" fill="#fff" stroke="#17213d" strokeWidth="3.5" />
      <rect x="47" y="76" width="26" height="16" rx="4" fill="#17213d" />
      <circle cx="66" cy="84" r="2.5" fill="#f59e0b" />
      <path d="M44 110l-4 20M76 110l4 20" stroke="#17213d" strokeWidth="11" strokeLinecap="round" />
      <path d="M35 131h12M73 131h12" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      <rect x="30" y="8" width="60" height="58" rx="28" fill="#fff" stroke="#17213d" strokeWidth="3.5" />
      <ellipse cx="60" cy="36" rx="22" ry="19" fill={visor} stroke="#17213d" strokeWidth="3" />
      <path d="M46 28c6-7 15-9 23-4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".75" />
    </svg>
  );
}

export function Satellite({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} aria-hidden="true" focusable="false">
      <rect x="2" y="16" width="36" height="28" fill="#dbe4ff" stroke="#17213d" strokeWidth="3" />
      <path d="M14 16v28M26 16v28M2 30h36" stroke="#2454d7" strokeWidth="1.5" />
      <rect x="82" y="16" width="36" height="28" fill="#dbe4ff" stroke="#17213d" strokeWidth="3" />
      <path d="M94 16v28M106 16v28M82 30h36" stroke="#2454d7" strokeWidth="1.5" />
      <path d="M38 30h10M72 30h10" stroke="#17213d" strokeWidth="3" />
      <rect x="48" y="18" width="24" height="24" rx="4" fill="#fff" stroke="#17213d" strokeWidth="3" />
      <path d="M60 18V6" stroke="#17213d" strokeWidth="3" /><circle cx="60" cy="5" r="3.5" fill="#c23b91" />
    </svg>
  );
}

export function RingedPlanet({ className = "", style, color = "#f59e0b" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M8 52c-8-10 28-26 56-30s56 0 54 12" fill="none" stroke="#17213d" strokeWidth="3" opacity=".25" />
      <circle cx="60" cy="40" r="26" fill={color} stroke="#17213d" strokeWidth="3" />
      <path d="M40 30c8 4 24 4 40-2M38 44c10 3 28 3 44-3" stroke="#fff" strokeWidth="3" opacity=".35" fill="none" strokeLinecap="round" />
      <path d="M118 34c2 12-26 24-54 28S2 64 8 52" fill="none" stroke="#17213d" strokeWidth="3" />
    </svg>
  );
}
