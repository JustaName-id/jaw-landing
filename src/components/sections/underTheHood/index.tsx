import Image from "next/image";

export const UnderTheHood = () => {
  return (
    <div
      id="under-the-hood"
      className="flex md:flex-row flex-col max-md:pb-14 max-md:pt-14 items-center gap-10  md:py-2.5 px-5 md:px-10 bg-white min-h-[80vh]"
    >
      <Image
        src="/sections/under-the-hood.webp"
        alt="Under the Hood"
        width={450}
        height={451}
        className="max-w-[450px] w-full aspect-[1.02]"
      />
      <div className="flex flex-col gap-2.5">
        <h2 className="text-5xl font-normal text-black leading-[100%]">
          Under the Hood
        </h2>
        <p className="text-base font-normal text-black leading-[150%]">
          Our implementation follows a streamlined approach where one account
          equals one identity, prioritizing seamless UX without compromising
          flexibility. The underlying toolbox remains fully modular, empowering
          developers to make their own implementation choices based on their
          specific needs.
        </p>
        <p className="text-base font-normal text-black leading-[150%]">
          The JAW prototype represents an opinionated implementation of the
          upcoming JAW toolbox, built on two fundamental pillars:
        </p>
        <p className="text-xl text-[#18181B] italic leading-[120%]">
          optimal user experience & maximal security.
        </p>
      </div>
    </div>
  );
};
