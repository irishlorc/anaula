"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "steady" | "drift" | "correcting";
type LogItem = { t: number; msg: string; kind: Phase };

const SETPOINT = 7.2;

// Culture colour: healthy = brand green, drifting off setpoint = amber.
function culture(ph: number) {
  const g = [95, 174, 114];
  const a = [217, 164, 65];
  const k = Math.max(0, Math.min(1, Math.abs(SETPOINT - ph) / 0.2));
  const c = g.map((v, j) => Math.round(v + (a[j] - v) * k));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const fmt = (t: number) => {
  const s = Math.floor(t / 5);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

function Spark({ data, min, max, color }: { data: number[]; min: number; max: number; color: string }) {
  const w = 120;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / Math.max(1, data.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x.toFixed(1)},${Math.max(1, Math.min(h - 1, y)).toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const PHASE_LABEL: Record<Phase, string> = {
  steady: "Sense",
  drift: "Control",
  correcting: "Correct",
};

export default function Reactor() {
  const [ph, setPh] = useState(SETPOINT);
  const [dox, setDox] = useState(40);
  const [temp, setTemp] = useState(37.0);
  const [phase, setPhase] = useState<Phase>("steady");
  const [hist, setHist] = useState<number[]>(() => Array(60).fill(SETPOINT));
  const [log, setLog] = useState<LogItem[]>([{ t: 0, msg: "Run started · setpoint pH 7.20", kind: "steady" }]);
  const s = useRef({ t: 0, ph: SETPOINT, dox: 40, phase: "steady" as Phase });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const push = (msg: string, kind: Phase) =>
      setLog((l) => [{ t: s.current.t, msg, kind }, ...l].slice(0, 3));

    const id = setInterval(() => {
      const st = s.current;
      st.t++;
      const n = (Math.random() - 0.5) * 0.006;
      if (st.phase === "steady") {
        st.ph += (SETPOINT - st.ph) * 0.1 + n;
        if (st.t % 45 === 0) {
          st.phase = "drift";
          push("Acid load detected · pH falling", "drift");
        }
      } else if (st.phase === "drift") {
        st.ph -= 0.011 + Math.random() * 0.006;
        if (st.ph < 7.0) {
          st.phase = "correcting";
          push("Base dosing · controller engaged", "correcting");
        }
      } else {
        st.ph += (SETPOINT - st.ph) * 0.11 + n * 0.5;
        if (Math.abs(st.ph - SETPOINT) < 0.008) {
          st.phase = "steady";
          push("Setpoint restored · pH 7.20", "steady");
        }
      }
      st.dox += (40 - st.dox) * 0.2 + (Math.random() - 0.5) * 0.8;
      setPh(st.ph);
      setDox(st.dox);
      setTemp(37 + (Math.random() - 0.5) * 0.04);
      setPhase(st.phase);
      setHist((h) => [...h.slice(1), st.ph]);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const media = culture(ph);
  const bubbles = Array.from({ length: 14 }, (_, i) => ({
    x: 150 + ((i * 37) % 120),
    r: 2 + (i % 3),
    d: 2.6 + (i % 5) * 0.55,
    delay: (i * 0.41) % 3,
  }));

  return (
    <div className="relative grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <style>{`
        @keyframes paddle { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(-1) } }
        .blade { transform-box: fill-box; transform-origin: center; animation: paddle 0.9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .blade { animation: none } }
      `}</style>

      {/* Vessel */}
      <div className="relative mx-auto w-full max-w-[300px] md:max-w-[360px]">
        <div
          className="pointer-events-none absolute inset-x-6 bottom-6 top-24 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: media, opacity: 0.35 }}
        />
        <svg viewBox="0 0 420 540" className="relative w-full" role="img" aria-label="Illustration of a bioreactor vessel whose culture medium changes colour with pH">
          <defs>
            <clipPath id="vessel">
              <path d="M90 120 H330 V430 Q330 500 260 500 H160 Q90 500 90 430 Z" />
            </clipPath>
            <linearGradient id="glass" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
              <stop offset="0.18" stopColor="#fff" stopOpacity="0.02" />
              <stop offset="0.85" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* media */}
          <g clipPath="url(#vessel)">
            <rect x="80" y="178" width="260" height="340" fill={media} style={{ transition: "fill 0.6s linear" }} />
            <rect x="80" y="178" width="260" height="340" fill="url(#depth)" />
            <rect x="80" y="176" width="260" height="3" fill="#fff" opacity="0.35" />
            {bubbles.map((b, i) => (
              <circle
                key={i}
                className="bubble"
                cx={b.x}
                cy={470}
                r={b.r}
                fill="#fff"
                opacity="0"
                style={{ animationDuration: `${b.d}s`, animationDelay: `${b.delay}s` }}
              />
            ))}
          </g>

          {/* shaft + impellers */}
          <rect x="207" y="96" width="6" height="364" fill="#0d110f" opacity="0.8" />
          {[300, 420].map((y) => (
            <g key={y}>
              <rect x="196" y={y - 5} width="28" height="10" rx="2" fill="#0d110f" />
              <rect className="blade" x="168" y={y - 12} width="84" height="24" rx="3" fill="#0d110f" opacity="0.9" />
            </g>
          ))}
          {/* sparger */}
          <rect x="150" y="476" width="120" height="5" rx="2.5" fill="#0d110f" opacity="0.8" />

          {/* probes */}
          {[
            { x: 128, y2: 370, l: "pH" },
            { x: 292, y2: 340, l: "DO" },
            { x: 262, y2: 250, l: "T" },
          ].map((p) => (
            <g key={p.l}>
              <rect x={p.x - 4} y="80" width="8" height={p.y2 - 80} rx="4" fill="#0d110f" opacity="0.75" />
              <circle cx={p.x} cy={p.y2} r="6" fill="#0d110f" />
              <text x={p.x} y="68" textAnchor="middle" fill="#0d110f" fontSize="13" fontFamily="var(--font-mono)" opacity="0.7">
                {p.l}
              </text>
            </g>
          ))}

          {/* glass + frame */}
          <path d="M90 120 H330 V430 Q330 500 260 500 H160 Q90 500 90 430 Z" fill="url(#glass)" stroke="#0d110f" strokeOpacity="0.85" strokeWidth="2" />
          <rect x="74" y="98" width="272" height="24" rx="4" fill="#0d110f" />
          <rect x="190" y="72" width="40" height="26" rx="3" fill="#0d110f" />
          {/* graduations */}
          {[200, 250, 300, 350, 400].map((y, i) => (
            <g key={y} opacity="0.45">
              <line x1="98" x2={i % 2 ? 108 : 114} y1={y} y2={y} stroke="#0d110f" />
            </g>
          ))}
          <rect x="140" y="502" width="140" height="18" rx="3" fill="#0d110f" />
        </svg>
      </div>

      {/* Telemetry */}
      <div className="rounded-2xl border border-line bg-ink p-5 text-paper shadow-[0_30px_60px_-30px_rgba(13,17,15,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow flex items-center gap-2 text-paper/70">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            Live
          </span>
          <div className="flex gap-1 font-mono text-[10px] uppercase tracking-[0.14em]">
            {(["steady", "drift", "correcting"] as Phase[]).map((p) => (
              <span
                key={p}
                className={`rounded-full px-2 py-1 transition-colors ${
                  phase === p ? "bg-paper text-ink" : "text-paper/40"
                }`}
              >
                {PHASE_LABEL[p]}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow text-mute">pH</div>
              <div className="font-mono text-4xl tabular-nums tracking-tight" style={{ color: media, transition: "color .6s" }}>
                {ph.toFixed(2)}
              </div>
            </div>
            <div className="w-28 pb-2">
              <Spark data={hist} min={6.9} max={7.35} color={media} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
          <div>
            <div className="eyebrow text-mute">Dissolved O₂</div>
            <div className="font-mono text-xl tabular-nums">{dox.toFixed(1)}%</div>
          </div>
          <div>
            <div className="eyebrow text-mute">Temp</div>
            <div className="font-mono text-xl tabular-nums">{temp.toFixed(2)}°C</div>
          </div>
        </div>

        <ul className="mt-4 hidden space-y-1.5 border-t border-line pt-4 font-mono text-[11px] text-paper/70 sm:block" aria-live="off">
          {log.map((l, i) => (
            <li key={`${l.t}-${i}`} className={`flex gap-3 ${i ? "opacity-50" : ""}`}>
              <span className="text-mute">{fmt(l.t)}</span>
              <span>{l.msg}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] leading-snug text-mute">
          Illustrative simulation of a closed control loop, not product data.
        </p>
      </div>
    </div>
  );
}
