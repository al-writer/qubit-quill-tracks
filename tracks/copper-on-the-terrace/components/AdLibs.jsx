const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))

// Backing vocals: handwritten, scrawled on as they are sung. They come from
// lyrics in parentheses, which prepare keeps out of the sung words and puts
// into each line's "adlibs" ([{ text, t, e }]).
const WRITE = 0.9 // s to "write" an ad-lib on
export default function AdLibs({ lines, t, fonts, color, at, size }) {
  const shown = lines.flatMap((l) => l.adlibs ?? []).filter((a) => t >= a.t - 0.05 && t < a.e + 0.5)
  return shown.map((a, n) => {
    const w = clamp((t - a.t) / WRITE)
    const q = clamp((t - a.e) / 0.5)
    const ease = 1 - (1 - w) ** 2
    return (
      <div
        key={a.t}
        style={{
          position: 'absolute',
          left: at.x,
          top: at.y + n * size * 1.1,
          transform: `rotate(-7deg) translateY(${-30 * q}px)`,
          transformOrigin: '0 50%',
          opacity: 1 - q,
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            fontFamily: `'${fonts.hand}', cursive`,
            fontWeight: 600,
            fontSize: size,
            lineHeight: 1,
            color,
            clipPath: `inset(-20% ${((1 - ease) * 100).toFixed(2)}% -20% -5%)`,
          }}
        >
          {a.text}
        </div>
        {/* pen swoosh under it, drawn right after the words */}
        <svg width={size * 6} height={size * 0.4} viewBox="0 0 600 40" style={{ display: 'block', marginTop: -size * 0.05, overflow: 'visible' }}>
          <path
            d="M6 28 C 150 6, 330 6, 590 18"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - clamp((t - a.t - WRITE * 0.8) / 0.4)}
          />
        </svg>
      </div>
    )
  })
}
