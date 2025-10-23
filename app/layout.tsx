'use client'

import React from 'react'
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";
import {AppSidebar} from "@/components/app-aside";
import {FaBookOpen, FaArrowRightFromBracket} from "react-icons/fa6";
import {ScrollProgressBar} from "@/animations/ScrollProgressBar";
import {motion} from 'framer-motion'

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollProgressBar/>
        <SidebarProvider>
            <motion.header
                className="py-2.5 px-7.5 max-w-screen-2xl fixed w-full"
                style={{zIndex: 49}}
            >
                {/* Optimized liquid glass container */}
                <motion.div
                    className="relative overflow-hidden rounded-[20px] flex items-center justify-between gap-10 border border-white/15 min-h-[60px]"
                    style={{
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 100%)",
                        boxShadow:
                            "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.1)"
                    }}
                >
                    {/* Static liquid layers - NO ANIMATIONS */}
                    {/* Primary liquid blob */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 -left-8 h-32 w-32 rounded-full z-0 opacity-60"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                            filter: "blur(12px)"
                        }}
                    />

                    {/* Secondary liquid blob */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 right-10 h-40 w-40 rounded-full z-0 opacity-50"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(47,128,237,0.6) 0%, rgba(47,128,237,0.3) 40%, transparent 70%)",
                            filter: "blur(14px)"
                        }}
                    />

                    {/* Subtle static gradient overlay */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-0 opacity-20"
                        style={{
                            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                        }}
                    />

                    {/* Single optimized sheen animation */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
                    >
                        <motion.div
                            className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)] w-[45%] h-full"
                            animate={{
                                x: ["-100%", "200%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 5, // Long pause between animations
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Liquid edge highlights */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10"
                    />

                    {/* CONTENT */}
                    <div className="relative z-20 p-3 pr-6 w-full flex items-center justify-between gap-10">
                        {/* Left: Brand */}
                        <div className="flex items-center gap-2">
                            <motion.span
                                className="p-2 rounded-[14px] text-white relative z-30"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #2f80ed 0%, #2b74d6 100%)",
                                    boxShadow: "0 8px 20px rgba(47,128,237,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                                }}
                                whileHover={{y: -1, scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                transition={{type: "spring", stiffness: 500, damping: 20}}
                            >
                                <FaBookOpen/>
                            </motion.span>

                            <span
                                className="font-semibold tracking-[-0.01em] text-[15px] sm:text-[16px] title_font text-blue-500/90 relative z-30">
                                Lemons CRM Docs
                            </span>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3 relative z-30">
                            <motion.div
                                whileTap={{scale: 0.98}}
                                className="min-[1124px]:hidden"
                                whileHover={{scale: 1.02}}
                                transition={{type: "spring", stiffness: 500, damping: 20}}
                            >
                                <SidebarTrigger/>
                            </motion.div>

                            <Link
                                href="https://lemonscrm.ge"
                                target="_blank"
                                className="title_font font-semibold text-[14px] text-blue-500/90 group relative"
                            >
                              <span className="flex items-center gap-2">
                                <span className="pt-[3.3px] relative">
                                  LemonsCRM
                                </span>
                                <motion.span
                                    initial={false}
                                    whileHover={{x: 2}}
                                    transition={{type: "spring", stiffness: 500, damping: 20}}
                                >
                                  <FaArrowRightFromBracket size={14}/>
                                </motion.span>
                                <span className="absolute left-1/2 -bottom-0.5 h-[1.5px] w-0 bg-blue-500/70 transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full"/>
                              </span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.header>


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


// import React from 'react'
// import type {Metadata} from "next";
// import {Geist, Geist_Mono} from "next/font/google";
// import "./globals.css";
// import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
// import Link from "next/link";
// import {AppSidebar} from "@/components/app-aside";
//
// import {FaBookOpen} from "react-icons/fa6";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
// import {ScrollProgressBar} from "@/animations/ScrollProgressBar";
//
//
// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });
//
// export const metadata: Metadata = {
//     title: "LemonsCRM Documentation",
//     description: "lemons crm documentation",
// };
//
// export default function RootLayout(
//     {
//         children,
//     }: Readonly<{
//         children: React.ReactNode;
//     }>) {
//     return (
//         <html lang="en">
//             <body
//                 className={`flex flex-col max-w-screen-2xl mx-auto ${geistSans.variable} ${geistMono.variable} antialiased`}
//             >
//                 <ScrollProgressBar/>
//                 <SidebarProvider>
//                     <header className={'py-2.5 px-7.5 max-w-screen-2xl fixed w-full'} style={{zIndex: 49}}>
//                         <div
//                             className={'bg-black/10 backdrop-blur-[2px] p-2.5 pr-5 rounded-[13px] flex items-center justify-between gap-10'}>
//                             <div className={'flex items-center gap-2'}>
//                                 <span className={'p-2 bg-[#2f80ed] rounded-[12px] text-white'}><FaBookOpen/></span>
//                                 <span className={'font-bold text-[16px] title_font'}>Lemons CRM Docs</span>
//                             </div>
//
//
//                             <div className={'flex items-center gap-3'}>
//                                 <SidebarTrigger className={'min-[1124px]:hidden'}/>
//                                 <Link
//                                     href={'https://lemonscrm.ge'} target={'_blank'}
//                                     className={'title_font font-bold text-[14px] text-blue-500 group'}
//                                 >
//                                     <span className={'flex items-center gap-2 group-hover:underline'}>
//                                         <span className={'pt-[3.3px]'}>LemonsCRM</span>
//                                         <FaArrowRightFromBracket size={14}/>
//                                     </span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </header>
//
//                     <main className=" gap-10 pt-24 px-5 w-full flex">
//                         <aside
//                             className="overflow-y-auto overflow-x-hidden max-h-150 w-65 shrink-0 hidden min-[1124px]:block min-[1124px]:sticky top-24  self-start">
//                             <AppSidebar/>
//                         </aside>
//
//                         {children}
//                     </main>
//                 </SidebarProvider>
//
//                 <footer className={'p-12 h-[100px]'}>
//                     <div className={'mx-auto w-fit'}>Motion is supported by the best in the industry.</div>
//                 </footer>
//             </body>
//         </html>
//     );
// }
