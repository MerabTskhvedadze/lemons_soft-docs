import React from 'react'
import {Geist, Geist_Mono} from "next/font/google";

import "./globals.css";

import Header from "@/components/header";
import {AppSidebar} from "@/components/app-aside";
import {SidebarProvider} from "@/components/ui/sidebar";
import {ScrollProgressBar} from "@/animations/ScrollProgressBar";
import {Metadata} from "next";

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


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollProgressBar/>
        <SidebarProvider>
            <Header/>

            <main className="gap-10 pt-24 px-5 w-full flex">
                <aside
                    className="overflow-y-auto overflow-x-hidden max-h-150 w-65 shrink-0 hidden min-[1124px]:block min-[1124px]:sticky top-24 self-start">
                    <AppSidebar/>
                </aside>
                {children}
            </main>
        </SidebarProvider>

        <footer className="p-12 h-[100px]">
            <div className="mx-auto w-fit">Motion is supported by the best in the industry.</div>
        </footer>
        </body>
        </html>
    );
}