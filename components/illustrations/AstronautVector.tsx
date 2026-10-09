export default function AstronautVector({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 320"
      role="img"
      aria-label="DPC astronaut illustration"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="suit" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#dce5ff" />
          <stop offset="1" stopColor="#a7b9ed" />
        </linearGradient>
        <linearGradient id="visor" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0c8ff" />
          <stop offset="0.42" stopColor="#6e5fc2" />
          <stop offset="1" stopColor="#101b4f" />
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#17213d" floodOpacity=".22" /></filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M70 116c-20 3-31 20-37 45l25 12 18-31Z" fill="#a7b9ed" stroke="#17213d" strokeWidth="5" />
        <path d="M190 116c20 3 31 20 37 45l-25 12-18-31Z" fill="#a7b9ed" stroke="#17213d" strokeWidth="5" />
        <rect x="74" y="25" width="112" height="110" rx="52" fill="url(#suit)" stroke="#17213d" strokeWidth="6" />
        <ellipse cx="130" cy="77" rx="43" ry="39" fill="url(#visor)" stroke="#17213d" strokeWidth="5" />
        <path d="M101 60c13-16 34-21 51-9" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="5" opacity=".7" />
        <path d="M91 132h78c21 0 38 17 38 38v76H53v-76c0-21 17-38 38-38Z" fill="url(#suit)" stroke="#17213d" strokeWidth="6" />
        <rect x="99" y="165" width="62" height="44" rx="9" fill="#17213d" />
        <path d="M107 176h46M107 187h29" stroke="#8ea6ff" strokeLinecap="round" strokeWidth="4" />
        <circle cx="145" cy="188" r="4" fill="#f59e0b" />
        <path d="M78 151l-25 44M182 151l25 44" stroke="#17213d" strokeLinecap="round" strokeWidth="15" />
        <circle cx="50" cy="201" r="13" fill="#dce5ff" stroke="#17213d" strokeWidth="5" />
        <circle cx="210" cy="201" r="13" fill="#dce5ff" stroke="#17213d" strokeWidth="5" />
        <path d="M91 242l-9 49M169 242l9 49" stroke="#17213d" strokeLinecap="round" strokeWidth="22" />
        <path d="M78 295h31M151 295h31" stroke="#c23b91" strokeLinecap="round" strokeWidth="13" />
        <path d="M56 135c-20-11-27-30-23-51" fill="none" stroke="#2454d7" strokeDasharray="5 9" strokeLinecap="round" strokeWidth="4" />
        <circle cx="31" cy="72" r="5" fill="#f59e0b" />
      </g>
    </svg>
  );
}
