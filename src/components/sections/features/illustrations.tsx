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
    <circle
      cx="20"
      cy="120"
      r="5"
      fill="var(--bg)"
      stroke="var(--ink)"
      strokeWidth="1.5"
    />
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
    <rect
      x="62"
      y="14"
      width="76"
      height="112"
      rx="12"
      fill="var(--bg-raise-2)"
      stroke="var(--line-2)"
    />
    <rect
      x="68"
      y="22"
      width="64"
      height="96"
      rx="6"
      fill="var(--bg)"
      stroke="var(--line)"
    />
    <rect
      x="88"
      y="22"
      width="24"
      height="5"
      rx="2.5"
      fill="var(--bg-raise-2)"
    />
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
        <circle
          r="12"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="1.2"
          opacity=".5"
        />
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
        <animate
          attributeName="y1"
          values="-18;18;-18"
          dur="4.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="-18;18;-18"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </line>
    </g>
    <g transform="translate(146 28)">
      <circle r="11" fill="var(--acc)" opacity=".2">
        <animate
          attributeName="r"
          values="11;16;11"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values=".25;0;.25"
          dur="4s"
          repeatCount="indefinite"
        />
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
  const ids = [
    "arbitrum",
    "avalanche",
    "base",
    "bsc",
    "celo",
    "ink",
    "linea",
    "optimism",
  ];
  const N = ids.length;

  // Each pulse cycles through all 8 chips in a different stride so the
  // three pulses land on different chips at any given time. The strides
  // 3, 5, 7 are coprime with 8 → each sequence visits every chip exactly once.
  const sequences: number[][] = [3, 5, 7].map((step, idx) => {
    const start = idx;
    return Array.from({ length: N }, (_, i) => (start + i * step) % N);
  });

  const VISIT = 1.6; // seconds per chip visit (was effectively 4.8s; faster + smaller)
  const CYCLE = N * VISIT; // total animation duration per pulse

  const buildPulseAnims = (seq: number[]) => {
    const keyTimes: number[] = [];
    const cx: number[] = [];
    const cy: number[] = [];
    const op: number[] = [];
    seq.forEach((idx, k) => {
      const a = (idx / N) * Math.PI * 2 - Math.PI / 2;
      const xChip = 100 + Math.cos(a) * 54;
      const yChip = 70 + Math.sin(a) * 54;
      // start of visit: center, invisible
      keyTimes.push(k / N);
      cx.push(100);
      cy.push(70);
      op.push(0);
      // fade-in done at 20% of visit (dot is ~20% of the way out)
      keyTimes.push((k + 0.2) / N);
      cx.push(100 + Math.cos(a) * 54 * 0.2);
      cy.push(70 + Math.sin(a) * 54 * 0.2);
      op.push(1);
      // at chip: 67% of visit (dot lands and is briefly held)
      keyTimes.push((k + 0.67) / N);
      cx.push(xChip);
      cy.push(yChip);
      op.push(1);
    });
    // final endpoint at t=1: center, invisible (interpolates from last chip back)
    keyTimes.push(1);
    cx.push(100);
    cy.push(70);
    op.push(0);
    return {
      keyTimes: keyTimes.join(";"),
      cx: cx.join(";"),
      cy: cy.join(";"),
      op: op.join(";"),
    };
  };

  return (
    <svg viewBox="0 0 200 140" width="100%" height="100%">
      <circle
        cx="100"
        cy="70"
        r="54"
        fill="none"
        stroke="var(--line-2)"
        strokeWidth=".8"
        opacity=".7"
      />
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
      {/* Pulses share the orbit's rotation so they always land ON a chip.
          Each pulse cycles through all chips in a varied order via stride. */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 70"
          to="360 100 70"
          dur="44s"
          repeatCount="indefinite"
        />
        {sequences.map((seq, k) => {
          const anims = buildPulseAnims(seq);
          // stagger pulses across one visit so they don't fire simultaneously
          const begin = `${(k * VISIT) / sequences.length}s`;
          return (
            <circle key={k} r="1.3" fill="var(--acc)">
              <animate
                attributeName="cx"
                values={anims.cx}
                keyTimes={anims.keyTimes}
                dur={`${CYCLE}s`}
                begin={begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={anims.cy}
                keyTimes={anims.keyTimes}
                dur={`${CYCLE}s`}
                begin={begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={anims.op}
                keyTimes={anims.keyTimes}
                dur={`${CYCLE}s`}
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
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
                <circle
                  r="9"
                  fill="var(--bg)"
                  stroke="var(--line-2)"
                  strokeWidth=".8"
                />
                <image
                  href={`/chain-svgs/${id}.svg`}
                  x="-6.5"
                  y="-6.5"
                  width="13"
                  height="13"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>
          );
        })}
      </g>
      <g>
        <circle
          cx="100"
          cy="70"
          r="18"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="1"
          opacity=".3"
        >
          <animate
            attributeName="r"
            values="18;26;18"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values=".35;0;.35"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="100"
          cy="70"
          r="14"
          fill="var(--bg-raise)"
          stroke="var(--acc)"
          strokeWidth="1.2"
        />
        <image
          href="/chain-svgs/ethereum.svg"
          x="91"
          y="61"
          width="18"
          height="18"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </svg>
  );
};
