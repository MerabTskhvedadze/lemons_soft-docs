import React from 'react'
import {Geist, Geist_Mono} from "next/font/google";

import "./globals.css";

import Header from "@/components/header";
import {AppSidebar} from "@/components/app-aside";
import {SidebarProvider} from "@/components/ui/sidebar";
import {ScrollProgressBar} from "@/animations/ScrollProgressBar";
import {Metadata} from "next";

import StyledComponentsRegistry from '@/lib/registry'

import "driver.js/dist/driver.css";
import {CursorProvider} from "@/context/cursor-context";
import {SidebarMenuProvider} from '@/context/SidebarMenuContext'
import MuiXLicense from "@/components/MuiXLicense";

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
                className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <StyledComponentsRegistry>
                    <SidebarMenuProvider>
                            <CursorProvider>
                                <ScrollProgressBar/>
                                <SidebarProvider>
                                    <Header/>

                                    <main className="pt-24 px-2 sm:px-5 w-full flex justify-center gap-7">
                                        <aside
                                            className="overflow-y-auto overflow-x-hidden max-h-150 shrink-0 hidden min-[1124px]:block min-[1124px]:sticky top-24 self-start">
                                            <AppSidebar/>
                                        </aside>

                                        <div className={'grow'}>
                                            {children}
                                        </div>
                                    </main>
                                </SidebarProvider>
                            </CursorProvider>
                        </SidebarMenuProvider>
                </StyledComponentsRegistry>
                <MuiXLicense/>
            </body>
        </html>
    );
}