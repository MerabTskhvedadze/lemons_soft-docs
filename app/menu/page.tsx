'use client'
import React from 'react'
import {Separator} from "@/components/ui/separator";
import {ScrollTrailText} from '@/animations/ScrollTrailText'

import Form from "@/components/menu/Form"
import SidebarBoard from '@/components/menu/SidebarBoard'

import {Button} from "@/components/ui/button";

export default function Menu() {
    return (
        <>
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    <Button
                        className="title_font bg-blue-700 text-sm"
                        size={'sm'}
                    >
                        გაეცანი გვერდს
                    </Button>
                </div>
            </header>

            <Separator className={'py-3 bg-transparent'}/>

            <section className={'flex flex-col-reverse sm:flex-row gap-10'}>
                <SidebarBoard />

                <Form/>


            </section>
        </>
    )
}
