import React from 'react'
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";
import {AppSidebar} from "@/components/app-aside";

import {FaBookOpen} from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LemonsCRM Documentation",
    description: "lemons crm documentation",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body
            className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
            <header className={'p-2.5 max-w-screen-2xl fixed w-full'} style={{zIndex: 49}}>
                <div
                    className={'bg-black/10 backdrop-blur-[2px] p-2.5 pr-5 rounded-[13px] flex items-center justify-between gap-10'}>
                    <div className={'flex items-center gap-2'}>
                        <span className={'p-2 bg-[#2f80ed] rounded-[12px] text-white'}><FaBookOpen/></span>
                        <span className={'font-bold text-[16px] title_font'}>Lemons CRM Docs</span>
                    </div>


                    <div className={'flex items-center gap-3'}>
                        <SidebarTrigger className={'min-[1124px]:hidden'}/>
                        <Link
                            href={'https://lemonscrm.ge'} target={'_blank'}
                            className={'title_font font-bold text-[14px] text-blue-500 group'}
                        >
                            <span className={'flex items-center gap-2 group-hover:underline'}>
                                <span className={'pt-[3.3px]'}>LemonsCRM</span>
                                <FaArrowRightFromBracket size={14}/>
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className=" gap-10 pt-24 px-5 w-full flex">
                <aside
                    className="overflow-y-auto overflow-x-hidden max-h-200 w-65 shrink-0 hidden min-[1124px]:block min-[1124px]:sticky top-24  self-start">
                    <AppSidebar/>
                </aside>

                {children}
            </main>
        </SidebarProvider>

        <footer className={'p-12 h-[100px]'}>
            <div className={'mx-auto w-fit'}>Motion is supported by the best in the industry.</div>
        </footer>
        </body>
        </html>
    );
}
