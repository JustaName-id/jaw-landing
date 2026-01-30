'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export const Navbar = () => {
    return (
        <header className="fixed top-[34px] md:top-[36px] left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <Image
                        src="/assets/jaw-id-logo.svg"
                        alt="JAW.ID"
                        width={120}
                        height={48}
                        className="h-[48px] w-auto"
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <a
                            href="https://docs.jaw.id"
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
                        <a href="https://dashboard.jaw.id">Get started</a>
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px]">
                        <nav className="flex flex-col gap-4 mt-8">
                            <a
                                href="https://docs.jaw.id"
                                className="text-lg font-medium hover:text-gray-600 transition-colors"
                            >
                                Documentation
                            </a>
                            <a
                                href="#faq"
                                className="text-lg font-medium hover:text-gray-600 transition-colors"
                            >
                                FAQ
                            </a>
                            <a
                                href="#contact"
                                className="text-lg font-medium hover:text-gray-600 transition-colors"
                            >
                                Contact Us
                            </a>
                            <Button
                                asChild
                                className="mt-4 bg-[#171717] text-white hover:bg-gray-800"
                            >
                                <a href="https://dashboard.jaw.id">Get started</a>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};