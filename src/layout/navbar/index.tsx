'use client'
import { Button } from "@/components/ui/button";
import { JawLogoIcon, JawTextLogoIcon } from "@/utils/icons";
import Link from "next/link";

export const Navbar = () => {
    return (
        <header className="flex fixed top-0 bg-white md:bg-transparent md:backdrop-blur-md left-0 right-0 z-50 flex-row w-full p-10 py-5 justify-between items-center">
            <Link href="/" className="flex flex-row gap-2.5 cursor-pointer items-center">
                <JawLogoIcon />
                <JawTextLogoIcon />
            </Link>
            <Link href="/" className="flex flex-row gap-2.5 cursor-pointer items-center">
                <Button variant={"default"}>
                    Prototype
                </Button>
            </Link>
        </header>)
};