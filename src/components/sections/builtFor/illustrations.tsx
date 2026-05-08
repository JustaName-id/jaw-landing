"use client";

import { useEffect, useState } from "react";

export const IllNeobank = () => {
  const gaps = [92, 120, 148];
  return (
    <svg viewBox="0 0 240 200" width="100%" height="100%">
      <line x1="30" y1="178" x2="210" y2="178" stroke="var(--line-2)" />
      <g>
        <polygon
          points="56,96 184,96 120,66"
          fill="var(--bg-raise-2)"
          stroke="var(--line-2)"
          strokeLinejoin="round"
        />
        <rect
          x="56"
          y="96"
          width="128"
          height="8"
          fill="var(--bg-raise)"
          stroke="var(--line-2)"
        />
        {[78, 106, 134, 162].map((x) => (
          <g key={x}>
            <rect
              x={x - 7}
              y="104"
              width="14"
              height="4"
              fill="var(--bg-raise-2)"
              stroke="var(--line-2)"
            />
            <rect
              x={x - 5}
              y="108"
              width="10"
              height="48"
              fill="var(--bg)"
              stroke="var(--line-2)"
            />
            <rect
              x={x - 7}
              y="156"
              width="14"
              height="4"
              fill="var(--bg-raise-2)"
              stroke="var(--line-2)"
            />
          </g>
        ))}
        <rect
          x="52"
          y="160"
          width="136"
          height="6"
          fill="var(--bg-raise)"
          stroke="var(--line-2)"
        />
        <rect
          x="44"
          y="166"
          width="152"
          height="6"
          fill="var(--bg-raise-2)"
          stroke="var(--line-2)"
        />
        <text
          x="120"
          y="88"
          textAnchor="middle"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="var(--ink-2)"
          letterSpacing=".18em"
        >
          JAW
        </text>
      </g>
      {gaps.map((x, i) => {
        const label = i === 1 ? "€" : "$";
        const delay = `${i * 1.0}s`;
        return (
          <g key={x}>
            <circle cx={x} r="7" fill="var(--acc)">
              <animate
                attributeName="cy"
                values="8;98"
                dur="3s"
                begin={delay}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="3s"
                begin={delay}
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={x}
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fontFamily="Inter"
              fill="var(--bg)"
              style={{ pointerEvents: "none" }}
            >
              {label}
              <animate
                attributeName="y"
                values="11;101"
                dur="3s"
                begin={delay}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="3s"
                begin={delay}
                repeatCount="indefinite"
              />
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const IllTradfi = () => {
  const [toggles, setToggles] = useState([true, true, false]);
  const roles = [
    { name: "Treasury Ops", scope: "transfer ≤ $50k" },
    { name: "Trader Role", scope: "swap · allowlist" },
    { name: "Emergency", scope: "pause · revoke" },
  ];
  const flip = (i: number) =>
    setToggles((t) => t.map((v, k) => (k === i ? !v : v)));
  return (
    <div className="flex w-full min-h-[300px] flex-col gap-[18px] rounded-[12px] border border-[var(--line-2)] bg-[var(--bg)] p-7 [font-family:Inter,sans-serif]">
      <div className="mono text-[10px] uppercase tracking-[.16em] text-[var(--ink-3)]">
        Permission Manager
      </div>
      <div className="h-px bg-[var(--line)]" />
      <div className="flex flex-1 flex-col justify-center gap-5">
        {roles.map((r, i) => {
          const on = toggles[i];
          return (
            <div
              key={r.name}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-[13px] font-medium leading-[1.2] text-[var(--ink)]">
                  {r.name}
                </div>
                <div className="mono mt-1 text-[10px] tracking-[.02em] text-[var(--ink-3)]">
                  {r.scope}
                </div>
              </div>
              <button
                type="button"
                onClick={() => flip(i)}
                aria-pressed={on}
                aria-label={`Toggle ${r.name}`}
                style={{
                  position: "relative",
                  width: 36,
                  height: 20,
                  borderRadius: 99,
                  background: on ? "var(--acc)" : "var(--bg-raise-2)",
                  border: `1px solid ${on ? "var(--acc)" : "var(--line-2)"}`,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all .18s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 1,
                    left: on ? 17 : 1,
                    width: 16,
                    height: 16,
                    borderRadius: 99,
                    background: "#fff",
                    boxShadow: "0 1px 2px rgba(15,23,42,.2)",
                    transition: "left .18s ease",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IllAgents = () => (
  <svg viewBox="0 0 240 200" width="100%" height="100%">
    <g transform="translate(32 100)">
      <circle r="18" fill="var(--bg-raise-2)" stroke="var(--line-2)" />
      <circle cx="0" cy="-4" r="5" fill="var(--ink-2)" />
      <path d="M-9 10 Q 0 4 9 10 L 9 12 L -9 12 Z" fill="var(--ink-2)" />
      <text
        y="40"
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-3)"
        letterSpacing=".1em"
      >
        USER
      </text>
    </g>
    <g transform="translate(120 100)">
      <rect
        x="-44"
        y="-24"
        width="88"
        height="48"
        rx="8"
        fill="var(--bg)"
        stroke="var(--acc)"
        strokeDasharray="4 3"
      />
      <text
        y="-4"
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="600"
        fill="var(--acc)"
        letterSpacing=".14em"
      >
        SESSION KEY
      </text>
      <text
        y="12"
        textAnchor="middle"
        fontSize="8"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-3)"
      >
        scope · cap · ttl
      </text>
      <text
        y="58"
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-3)"
        letterSpacing=".1em"
      >
        GRANTED
      </text>
    </g>
    <g transform="translate(208 100)">
      <rect
        x="-18"
        y="-18"
        width="36"
        height="36"
        rx="5"
        fill="var(--bg-raise-2)"
        stroke="var(--acc)"
      />
      <circle cx="-5" cy="-4" r="2.5" fill="var(--acc)" />
      <circle cx="5" cy="-4" r="2.5" fill="var(--acc)" />
      <path
        d="M-7 7 Q 0 11 7 7"
        stroke="var(--acc)"
        fill="none"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
      <text
        y="40"
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-3)"
        letterSpacing=".1em"
      >
        AGENT
      </text>
    </g>
    <line x1="54" y1="100" x2="74" y2="100" stroke="var(--line-2)" />
    <line x1="166" y1="100" x2="188" y2="100" stroke="var(--line-2)" />
    <circle r="2.5" fill="var(--acc)">
      <animate
        attributeName="cx"
        values="56;186"
        dur="2.6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cy"
        values="100;100"
        dur="2.6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        dur="2.6s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export const IllSubs = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200);
    return () => clearInterval(id);
  }, []);
  const N = 6;
  const cadences = ["monthly", "weekly", "daily", "hourly"];
  const cadence = cadences[tick % cadences.length];
  return (
    <svg viewBox="0 0 240 200" width="100%" height="100%">
      <g transform="translate(120 100)">
        <circle
          r="48"
          fill="none"
          stroke="var(--line-2)"
          strokeDasharray="3 4"
        />
        <circle
          r="48"
          fill="none"
          stroke="var(--acc)"
          strokeDasharray="60 240"
          strokeLinecap="round"
          transform="rotate(-90)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="-90"
            to="270"
            dur="7.2s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          y="-4"
          textAnchor="middle"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          fill="var(--ink-3)"
          letterSpacing=".1em"
        >
          RECURRING
        </text>
        <text
          key={cadence}
          y="12"
          textAnchor="middle"
          fontSize="14"
          fontFamily="Inter"
          fontWeight="500"
          fill="var(--acc)"
          style={{ animation: "cadenceSwap .5s ease-out" }}
        >
          {cadence}
        </text>
      </g>
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        const x = 120 + Math.cos(a) * 66;
        const y = 100 + Math.sin(a) * 66;
        const active = tick % N === i || (tick - 1 + N) % N === i;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={active ? 4 : 3}
            fill={active ? "var(--acc)" : "var(--line-2)"}
            style={{ transition: "fill .4s, r .4s" }}
          />
        );
      })}
    </svg>
  );
};

export const IllDapps = () => (
  <svg viewBox="0 0 240 200" width="100%" height="100%">
    <rect
      x="32"
      y="44"
      width="176"
      height="112"
      rx="10"
      fill="var(--bg)"
      stroke="var(--line-2)"
    />
    <text
      x="44"
      y="62"
      fontSize="8"
      fontFamily="JetBrains Mono, monospace"
      fill="var(--ink-3)"
      letterSpacing=".14em"
    >
      SIGN IN
    </text>
    <line x1="32" y1="70" x2="208" y2="70" stroke="var(--line)" />
    <g>
      <rect
        x="44"
        y="80"
        width="152"
        height="24"
        rx="5"
        fill="var(--bg-raise)"
        stroke="var(--line-2)"
      />
      <rect x="52" y="86" width="12" height="12" rx="2.5" fill="var(--acc)" />
      <text
        x="58"
        y="95"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="var(--bg)"
      >
        L
      </text>
      <text x="72" y="92" fontSize="9" fontWeight="500" fill="var(--ink)">
        leo.jaw.id
      </text>
      <text
        x="72"
        y="101"
        fontSize="7"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-3)"
        letterSpacing=".06em"
      >
        PASSKEY
      </text>
      <path
        d="M186 87 l4 4 l-4 4"
        stroke="var(--ink-3)"
        fill="none"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </g>
    <line x1="52" y1="116" x2="104" y2="116" stroke="var(--line-2)" />
    <text
      x="120"
      y="119"
      textAnchor="middle"
      fontSize="7.5"
      fontFamily="JetBrains Mono, monospace"
      fill="var(--ink-3)"
      letterSpacing=".14em"
    >
      OR
    </text>
    <line x1="136" y1="116" x2="188" y2="116" stroke="var(--line-2)" />
    <g>
      <rect
        x="44"
        y="128"
        width="100"
        height="22"
        rx="5"
        fill="var(--bg-raise)"
        stroke="var(--line-2)"
      />
      <text x="52" y="143" fontSize="8.5" fill="var(--ink-3)">
        username
      </text>
      <text
        x="138"
        y="143"
        textAnchor="end"
        fontSize="8"
        fontFamily="JetBrains Mono, monospace"
        fill="var(--ink-2)"
      >
        .jaw.id
      </text>
      <rect x="89" y="134" width="1.2" height="11" fill="var(--acc)">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="150" y="128" width="46" height="22" rx="5" fill="var(--acc)" />
      <text
        x="173"
        y="143"
        textAnchor="middle"
        fontSize="9"
        fontWeight="500"
        fill="var(--bg)"
      >
        Create
      </text>
    </g>
  </svg>
);
