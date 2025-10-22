import React from 'react'
import {AppSidebar} from "@/components/app-aside";

export default function template({children}: { children: React.ReactNode }) {
    return (
        <main className=" gap-10 pt-40 px-5 w-full flex">
            <aside className="overflow-y-auto overflow-x-hidden max-h-200 w-65 shrink-0 hidden min-[1124px]:block min-[1124px]:sticky top-24  self-start">
                <AppSidebar/>
            </aside>

            <section className="max-w-screen-lg w-full pt-4">
                <div className="mx-auto max-w-[50rem]">
                    {children}
                </div>
            </section>
        </main>
    );
}