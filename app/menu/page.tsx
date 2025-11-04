'use client'

import React from 'react'
import {ScrollTrailText} from '@/animations/ScrollTrailText'
import Board from '@/components/board/Board'
import {initialBoard} from '@/data/boardSample'

export default function Menu() {
    return (
        <>
            {/* overview */}
            <header className="flex flex-col gap-3 tour-intro">
                <h1 className="title_font text-lg">
                    <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </h1>
            </header>

            <Board initial={initialBoard} />
        </>
    )
}
