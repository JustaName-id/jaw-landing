export const Vision = () => {
  return (
    <div className="flex flex-col items-center gap-10 py-28 px-5 md:px-48 bg-black">
      <h2 className="text-4xl font-normal text-foreground md:text-center">
        The Identity Infrastructure Powering Web3's User Revolution
      </h2>
      <div className="flex flex-col gap-2">
        <p className="text-base text-foreground font-normal leading-[150%]">
          Web3 promised user sovereignty and seamless digital experiences.
          Instead, we got seed phrases, gas anxiety, and fragmented identities
          across a thousand protocols. The gap between Web2's personalized UX
          and Web3's revolutionary ownership model has never been wider.
        </p>
        <p className="text-base text-foreground font-bold leading-[150%]">
          JAW bridges this chasm through a fundamental insight: identity and
          accounts shouldn't be separate systems.
        </p>
        <p className="text-base text-foreground font-normal leading-[150%]">
          Our prototype demonstrates how unifying ENS-based identity with
          passkey-secured smart accounts creates a new primitive for Web3
          development. One integration gives your users a permanent, portable
          identity with bank-grade security. No seed phrases. No external auth
          servers. Just the Web2-grade experience your users expect, powered by
          the decentralized infrastructure they deserve.
        </p>
        <p className="text-base text-foreground font-bold leading-[150%]">
          We built the identity-account layer that Web3 has been missing.
        </p>
      </div>
    </div>
  );
};
