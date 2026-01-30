'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from 'next/link'
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <header className="fixed top-[34px] md:top-[36px] left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[60px] md:h-[68px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/jaw-id-logo.svg"
                        alt="JAW.ID"
                        width={120}
                        height={48}
                        className="h-[32px] md:h-[48px] w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <a
                            href="https://docs.jaw.id"
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-900 hover:text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Documentation
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-900 hover:text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                    <Button
                        asChild
                        className="bg-[#171717] text-white hover:bg-gray-800 h-9"
                    >
                        <a href="https://dashboard.jaw.id"                             target="_blank" rel="noopener noreferrer"
                        >Get started</a>
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="h-5 w-5 text-gray-900" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <nav className="flex text-center flex-col gap-1 mt-8">
                            <a
                                href="https://docs.jaw.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleLinkClick}
                                className="text-base font-medium text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-all py-3 px-4 rounded-lg "
                            >
                                Documentation
                            </a>
                            <a
                                href="#contact"
                                onClick={handleLinkClick}
                                className="text-base font-medium text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-all py-3 px-4 rounded-lg "
                            >
                                Contact Us
                            </a>
                            <Button
                                asChild
                                className="mt-6 bg-[#171717] text-white hover:bg-gray-800 h-11 "
                            >
                                <a
                                    href="https://dashboard.jaw.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleLinkClick}
                                >
                                    Get started
                                </a>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};