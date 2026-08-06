import { useEffect, useRef, useState } from "react";

const DATA = [
  { label: "00:00", value: 32 },
  { label: "04:00", value: 48 },
  { label: "08:00", value: 71 },
  { label: "12:00", value: 58 },
  { label: "16:00", value: 89 },
  { label: "20:00", value: 63 },
  { label: "24:00", value: 41 },
];

function catmullRomPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function WorldTrafficChart() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const [hover, setHover] = useState(null);
  const [dims, setDims] = useState({ w: 700, h: 220 });

  useEffect(() => {
    function measure() {
      if (wrapRef.current) {
        setDims({ w: wrapRef.current.clientWidth, h: 220 });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.getBoundingClientRect();
    el.style.transition = "stroke-dashoffset 1.4s ease";
    el.style.strokeDashoffset = "0";
  }, [dims]);

  const padding = { top: 20, right: 20, bottom: 30, left: 20 };
  const innerW = dims.w - padding.left - padding.right;
  const innerH = dims.h - padding.top - padding.bottom;
  const maxVal = Math.max(...DATA.map((d) => d.value)) * 1.2;

  const points = DATA.map((d, i) => ({
    x: padding.left + (i / (DATA.length - 1)) * innerW,
    y: padding.top + innerH - (d.value / maxVal) * innerH,
    ...d,
  }));

  const linePath = catmullRomPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerH} L ${points[0].x} ${padding.top + innerH} Z`;

  return (
    <div ref={wrapRef} style={{ width: "100%" }}>
      <svg width={dims.w} height={dims.h} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,234,255,0.35)" />
            <stop offset="100%" stopColor="rgba(0,234,255,0)" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padding.left}
            x2={dims.w - padding.right}
            y1={padding.top + innerH * (1 - f)}
            y2={padding.top + innerH * (1 - f)}
            stroke="rgba(0,170,255,0.1)"
            strokeWidth="1"
          />
        ))}

        <path d={areaPath} fill="url(#areaFill)" stroke="none" />
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="#00eaff"
          strokeWidth="2.5"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,234,255,0.7))" }}
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="#050b18"
              stroke="#00eaff"
              strokeWidth="2"
              style={{ transition: "r 0.15s ease", cursor: "pointer" }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            <text x={p.x} y={dims.h - 6} textAnchor="middle" fontSize="11" fill="#4a6580">
              {p.label}
            </text>
            {hover === i && (
              <g>
                <rect
                  x={p.x - 24}
                  y={p.y - 34}
                  width="48"
                  height="24"
                  rx="6"
                  fill="#111827"
                  stroke="#00eaff"
                  strokeWidth="1"
                />
                <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize="12" fill="#00eaff" fontWeight="600">
                  {p.value}%
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}