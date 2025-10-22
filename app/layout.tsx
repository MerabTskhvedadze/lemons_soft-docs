import React from 'react'
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { FaBookOpen } from "react-icons/fa6";

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
            <body className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider>
                    <header className={'p-2.5 max-w-screen-2xl fixed w-full'} style={{zIndex: 49}}>
                        <div
                            className={'bg-black/10 backdrop-blur-[2px] p-2.5 rounded-[13px] flex items-center justify-between gap-10'}>
                            <div className={'flex items-center gap-2'}>
                                <span className={'p-2 bg-[#2f80ed] rounded-[12px] text-white'}><FaBookOpen/></span>
                                <span className={'font-bold text-[16px]'}>Lemons CRM Docs</span>
                            </div>

                            <SidebarTrigger/>

                            <div className={'flex items-center gap-3'}>
                                <span>docs</span>
                                <span>production</span>
                                <span>examples</span>
                            </div>
                        </div>
                    </header>
                    {children}
                </SidebarProvider>
                <footer className={'p-12 h-[100vh]'}>
                    <div className={'mx-auto w-fit'}>Motion is supported by the best in the industry.</div>
                </footer>
            </body>
        </html>
    );
}
