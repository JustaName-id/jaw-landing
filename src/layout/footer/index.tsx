"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socials = [
  {
    href: "https://x.com/justaname_id",
    icon: Twitter,
  },
  {
    href: "https://github.com/JustaName-id",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/company/just-a-lab",
    icon: Linkedin,
  },
];

export const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col w-full p-10 justify-between items-center bg-[#F8FAFC]">
      <div className="flex md:flex-row flex-col gap-5">
        <Link
          href="/"
          className="py-2 px-4 text-xl max-md:text-center font-normal leading-[100%] text-primary cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="https://justaname.id/"
          target="_blank"
          className="py-2 px-4 text-xl max-md:text-center font-normal leading-[100%] text-primary cursor-pointer"
        >
          JustaName
        </Link>
        <Link
          href="https://prototype.jaw.id/"
          target="_blank"
          className="py-2 px-4 text-xl max-md:text-center font-normal leading-[100%] text-primary cursor-pointer"
        >
          Prototype
        </Link>
      </div>
      <div className="flex gap-5 max-md:py-5 items-center">
        {socials.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            className="text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            <social.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
      <div className="flex flex-col md:items-end items-center gap-2.5 ">
        <p className="text-sm text-black font-normal leading-[160%]">
          Built by the Team at JustaLab
        </p>
        <p className="text-xs text-black font-bold leading-[140%]">
          JustaLab, Copyright, 2025. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
