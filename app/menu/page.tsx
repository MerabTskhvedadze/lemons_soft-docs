'use client'

import React from 'react'
import {Separator} from "@/components/ui/separator";
import {ScrollTrailText} from '@/animations/ScrollTrailText'

import Form from "@/components/menu/Form"
import SidebarBoard from '@/components/menu/SidebarBoard'

import {sidebarInitial} from '@/data/sidebarInitials'

export default function Menu() {
    return (
        <>
            {/* overview */}
            <header className="flex flex-col gap-3 tour-intro">
                <h1 className="title_font text-lg">
                    <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </h1>
            </header>

            <Separator className={'py-3 bg-transparent'}/>

            <section className={'flex flex-col-reverse sm:flex-row gap-10'}>
                <SidebarBoard sections={sidebarInitial} />

                <Form/>
            </section>
        </>
    )
}
