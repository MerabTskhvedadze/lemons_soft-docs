'use client'

import React from 'react'
// import {Separator} from '@/components/ui/separator'
import {ScrollTrailText} from '@/animations/ScrollTrailText'
import {MenuItem} from '@/components/menu'

export default function Menu() {
    return (
        <>
            {/* overview */}
            <header className="flex flex-col gap-3 tour-intro">
                <h1 className="title_font text-lg">
                    <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </h1>
            </header>

            <MenuItem/>
        </>
    )
}
