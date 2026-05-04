export const DeployIll = () => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <path
      id="arc"
      d="M20 120 Q 100 20 180 80"
      fill="none"
      stroke="var(--line-2)"
      strokeWidth="1"
      strokeDasharray="3 4"
    />
    <path
      d="M20 120 Q 100 20 180 80"
      fill="none"
      stroke="var(--acc)"
      strokeWidth="2"
      strokeDasharray="200"
      strokeDashoffset="200"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="200"
        to="0"
        dur="4.5s"
        repeatCount="indefinite"
      />
    </path>
    <circle cx="20" cy="120" r="5" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5" />
    <g>
      <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
        <mpath href="#arc" />
      </animateMotion>
      <circle r="6" fill="var(--acc)" />
      <circle r="10" fill="var(--acc)" opacity=".3" />
    </g>
    {[40, 70, 100, 130, 160].map((x, i) => (
      <line
        key={x}
        x1={x}
        y1="125"
        x2={x}
        y2={i % 2 ? 132 : 130}
        stroke="var(--ink-4)"
      />
    ))}
    <text
      x="20"
      y="138"
      fontSize="8"
      fontFamily="JetBrains Mono, monospace"
      fill="var(--ink-3)"
    >
      t=0
    </text>
    <text
      x="170"
      y="70"
      fontSize="8"
      fontFamily="JetBrains Mono, monospace"
      fill="var(--acc)"
    >
      live
    </text>
  </svg>
);

export const OnboardIll = () => (
  <svg viewBox="0 0 200 140" width="100%" height="100%">
    <rect x="62" y="14" width="76" height="112" rx="12" fill="var(--bg-raise-2)" stroke="var(--line-2)" />
    <rect x="68" y="22" width="64" height="96" rx="6" fill="var(--bg)" stroke="var(--line)" />
    <rect x="88" y="22" width="24" height="5" rx="2.5" fill="var(--bg-raise-2)" />
    <g transform="translate(100 62)">
      {[
        [-18, -18, 0, 0],
        [18, -18, 1, 0],
        [18, 18, 1, 1],
        [-18, 18, 0, 1],
      ].map(([x, y, fx, fy], i) => (
        <g
          key={i}
          transform={`translate(${x} ${y}) scale(${fx ? -1 : 1} ${fy ? -1 : 1})`}
        >
          <path
            d="M0 8 L0 0 L8 0"
            fill="none"
            stroke="var(--acc)"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              values=".3;1;.3"
              dur="4s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      ))}
      <g opacity=".85">
        <circle r="12" fill="none" stroke="var(--acc)" strokeWidth="1.2" opacity=".5" />
        <circle cx="-4" cy="-2" r="1.2" fill="var(--acc)" />
        <circle cx="4" cy="-2" r="1.2" fill="var(--acc)" />
        <path
          d="M-4 4 Q 0 7 4 4"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
      <line x1="-18" x2="18" stroke="var(--acc)" strokeWidth="1" opacity=".8">
        <animate attributeName="y1" values="-18;18;-18" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="-18;18;-18" dur="4.5s" repeatCount="indefinite" />
      </line>
    </g>
    <g transform="translate(146 28)">
      <circle r="11" fill="var(--acc)" opacity=".2">
        <animate attributeName="r" values="11;16;11" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".25;0;.25" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle r="11" fill="var(--acc)" />
      <path
        d="M-5 0 -1 4 6 -4"
        stroke="var(--bg)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <text
      x="100"
      y="136"
      fontSize="7"
      fontFamily="JetBrains Mono, monospace"
      textAnchor="middle"
      fill="var(--ink-3)"
      letterSpacing=".14em"
    >
      PASSKEY · ON DEVICE
    </text>
  </svg>
);

export const ChainsIll = () => {
  const mark: Record<string, { color: string; d: string }> = {
    eth: {
      color: "#627EEA",
      d: "M12 4v5.2l5 2.2zM12 4 7 11.4l5-2.2zm0 9.5v4.5L17 12zM12 18v-4.5L7 12zM12 12.5 17 12l-5-2.7zM7 12l5 .5V9.8z",
    },
    base: {
      color: "#0052FF",
      d: "M12 20.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 8.3 7H6.3v3h14a8.5 8.5 0 0 1-8.3 7z",
    },
    op: {
      color: "#FF0420",
      d: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.2 11.2c-.7 0-1.2-.2-1.6-.5-.3-.3-.5-.8-.5-1.4 0-.1 0-.3 0-.4.1-.7.3-1.2.5-1.6.5-.9 1.3-1.3 2.4-1.3.7 0 1.2.2 1.5.5.4.3.5.8.5 1.4 0 .1 0 .3 0 .4-.1.8-.3 1.3-.5 1.7-.5.8-1.3 1.2-2.3 1.2zm4.2-.8 1.1-5.4h2c.6 0 1 .1 1.3.3.3.2.5.5.5 1 0 .2 0 .3 0 .5-.1.5-.3 1-.7 1.3-.4.3-.9.4-1.5.4h-.9l-.4 1.9z",
    },
    arb: {
      color: "#28A0F0",
      d: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.8 4 2.7 6.5h-1.6l-.6-1.6h-2.3l-.6 1.6H6.4zM15.5 8 18 14.5h-1.6l-.5-1.6h-2.4l-.5 1.6H11.4z",
    },
    linea: {
      color: "#121212",
      d: "M7 8.5h1.6v7H7zm3 0h1.6v5.4H15V15.5h-5z",
    },
    avax: {
      color: "#E84142",
      d: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-2.3 11.2h-1.9c-.3 0-.5 0-.6-.1-.1-.1-.2-.2-.2-.4s.1-.3.2-.5l3.7-6.5c.1-.2.2-.3.4-.4.2-.1.3-.1.6-.1h1.9c.3 0 .5 0 .6.1.1.1.2.2.2.4s-.1.3-.2.5L10.7 14.7c-.1.2-.2.3-.4.4-.2.1-.3.1-.6.1zm5.5 0h-2.1c-.2 0-.4 0-.5-.1-.1-.1-.2-.2-.2-.4s.1-.3.2-.5l1-1.8c.1-.2.2-.3.4-.4.1-.1.3-.1.5-.1s.4 0 .5.1.3.2.4.4l1.1 1.8c.1.2.1.3.1.5s-.1.3-.2.4c-.1.1-.3.1-.5.1z",
    },
    bnb: {
      color: "#F0B90B",
      d: "M12 4.5 14.2 7 9.6 11.4 7.3 9zm-5.5 5.3L8.8 12l-2.3 2.2L4.2 12zM12 15.5l2.2-2.2 2.2 2.2L12 20zm5.2-3.5L19.5 10l2.3 2.3-2.3 2.2zM12 8l2.3 2.3L12 12.5 9.7 10.3z",
    },
    celo: {
      color: "#FCFF52",
      d: "M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM9 9.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm6 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
    },
    flr: {
      color: "#E62058",
      d: "M7 7.5h10v2H9.5v2H15V13.5H9.5v3.5H7z",
    },
    ink: {
      color: "#7132F5",
      d: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z",
    },
  };
  const ids = ["base", "op", "arb", "linea", "avax", "bnb", "celo", "flr", "ink"];

  return (
    <svg viewBox="0 0 200 140" width="100%" height="100%">
      <circle cx="100" cy="70" r="54" fill="none" stroke="var(--line-2)" strokeWidth=".8" opacity=".7" />
      <circle
        cx="100"
        cy="70"
        r="34"
        fill="none"
        stroke="var(--line-2)"
        strokeWidth=".8"
        strokeDasharray="1 3"
        opacity=".6"
      />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r1 = 56;
        const r2 = 60;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={70 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={70 + Math.sin(a) * r2}
            stroke="var(--line-2)"
            strokeWidth=".6"
            opacity=".6"
          />
        );
      })}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 70"
          to="360 100 70"
          dur="44s"
          repeatCount="indefinite"
        />
        {ids.map((id, i) => {
          const a = (i / ids.length) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + Math.cos(a) * 54;
          const y = 70 + Math.sin(a) * 54;
          const m = mark[id];
          return (
            <g key={id} transform={`translate(${x} ${y})`}>
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="-360"
                  dur="44s"
                  repeatCount="indefinite"
                />
                <circle r="9" fill="var(--bg)" stroke="var(--line-2)" strokeWidth=".8" />
                <g transform="translate(-6 -6) scale(0.5)">
                  <path d={m.d} fill={m.color} />
                </g>
              </g>
            </g>
          );
        })}
      </g>
      {[0, 3, 6].map((idx, k) => {
        const a = (idx / ids.length) * Math.PI * 2 - Math.PI / 2;
        const x = 100 + Math.cos(a) * 50;
        const y = 70 + Math.sin(a) * 50;
        return (
          <circle key={k} r="1.6" fill="var(--acc)">
            <animate
              attributeName="cx"
              values={`100;${x}`}
              dur="4.8s"
              begin={`${k * 1.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`70;${y}`}
              dur="4.8s"
              begin={`${k * 1.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="4.8s"
              begin={`${k * 1.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      <g>
        <circle cx="100" cy="70" r="18" fill="none" stroke="var(--acc)" strokeWidth="1" opacity=".3">
          <animate attributeName="r" values="18;26;18" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;0;.35" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="70" r="14" fill="var(--bg-raise)" stroke="var(--acc)" strokeWidth="1.2" />
        <g transform="translate(94 63.5) scale(0.5)">
          <path d={mark.eth.d} fill="#627EEA" />
        </g>
      </g>
    </svg>
  );
};
