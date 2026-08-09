import { useMemo } from "react";

// Generates random base64-looking tokens to fill the background "cipher wall"
function generateCipherRows(rowCount, tokensPerRow) {
  const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/";
  function randomToken() {
    const len = 6 + Math.floor(Math.random() * 6);
    let str = "";
    for (let i = 0; i < len; i++) {
      str += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return str;
  }

  return Array.from({ length: rowCount }, () =>
    Array.from({ length: tokensPerRow }, () => randomToken()).join("  ...  ")
  );
}

export default function EncryptionSection() {
  const rows = useMemo(() => generateCipherRows(14, 6), []);

  return (
    <section className="encryption-section">
      <h2 className="encryption-heading">
        Performance <span className="amp">&amp;</span> security.
      </h2>

      <div className="cipher-wall" aria-hidden="true">
        {rows.map((row, i) => (
          <div
            key={i}
            className="cipher-row"
            style={{ animationDelay: `${(i % 7) * 0.4}s` }}
          >
            {row}
          </div>
        ))}
      </div>

      <div className="lock-wrap">
        <div className="lock-ping ping-1"></div>
        <div className="lock-ping ping-2"></div>
        <div className="lock-ping ping-3"></div>
        <svg viewBox="0 0 100 120" className="lock-svg">
          <defs>
            <linearGradient id="lockGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          {/* shackle */}
          <path
            d="M 30 45 V 32 A 20 20 0 0 1 70 32 V 45"
            fill="none"
            stroke="url(#lockGradient)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* body */}
          <rect x="20" y="45" width="60" height="55" rx="12" fill="url(#lockGradient)" />
          {/* keyhole */}
          <circle cx="50" cy="68" r="7" fill="#0a0620" />
          <rect x="46" y="72" width="8" height="16" rx="3" fill="#0a0620" />
        </svg>
        <div className="lock-glow"></div>
      </div>

      <div className="encryption-tag">Encryption</div>
    </section>
  );
}