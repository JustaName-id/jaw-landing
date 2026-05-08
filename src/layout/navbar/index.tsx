"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const links: NavLink[] = [
  { label: "Playground", href: "https://playground.jaw.id/", external: true },
  { label: "Documentation", href: "https://docs.jaw.id", external: true },
  { label: "Contact Us", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/85 [backdrop-filter:saturate(140%)_blur(14px)] [-webkit-backdrop-filter:saturate(140%)_blur(14px)] border-b border-[var(--line)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[60px] max-w-[1260px] items-center justify-between px-5 md:h-[68px] md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-[var(--ink)]">
          <Image
            src="/assets/brand-mark.png"
            alt=""
            width={22}
            height={22}
            className="block object-contain"
          />
          <span className="text-2xl font-semibold tracking-[-0.01em]">
            JAW
            <span className="font-normal text-[var(--ink-3)]">.id</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--bg-raise)] p-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="navlink whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium text-[var(--ink-2)] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://dashboard.jaw.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary max-md:!px-3.5 max-md:!py-1.5 max-md:!text-[12px] max-md:!gap-0"
          >
            Get started{" "}
            <ArrowRight size={13} className="max-md:hidden" />
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--line-2)] bg-transparent text-[var(--ink)] md:hidden"
              >
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1 px-2">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
                    onClick={handleLinkClick}
                    className="rounded-lg px-4 py-3 text-base font-medium text-[var(--ink)] transition-all hover:bg-[var(--bg-raise-2)] active:bg-[var(--bg-raise-2)]"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="https://dashboard.jaw.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-primary mt-4 justify-center px-[18px] py-3 text-sm"
                >
                  Get started <ArrowRight size={14} />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
