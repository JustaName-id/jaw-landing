"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const Hero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-10 bg-[url('/sections/hero-bg.webp')] bg-cover bg-center justify-center items-center gap-10 py-28 md:py-2.5 px-5 md:px-10 bg-white min-h-[100vh]">
            <Image src="/sections/hero.webp" alt="Changelly Partner" width={900} height={680} className="col-span-1 max-h-[680px] md:col-span-6 w-full md:order-2" />
            <div className="flex flex-col gap-6 md:order-1 md:col-span-4">
                <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col text-5xl leading-[100%] text-black">
                        <h1 className="font-bold">Identity-Powered Infrastructure</h1>
                        <h1 className="font-normal">for the Smart Wallet Era</h1>
                    </div>
                    <p className="text-base font-normal text-black leading-[150%]">
                        Two-line integration. Permanent identity. Pure smart contracts.<br />
                        The complete stack, unified at last.
                    </p>
                </div>
                <div className="flex flex-row w-fit gap-2.5 items-center">
                    <Button
                        variant={"outline"}
                        className="mr-auto"
                        onClick={() => {
                            const element = document.getElementById("under-the-hood");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        Technical Docs
                    </Button>
                    <Link href="https://prototype.jaw.id/" target="_blank">
                        <Button
                            variant={"default"}
                            className="mr-auto"
                        >
                            Explore Prototype
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}