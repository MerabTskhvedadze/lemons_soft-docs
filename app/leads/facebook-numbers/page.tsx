'use client'

import React from "react";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

import {FbStatisticModal} from '@/components/modals'
import Table from '@/components/number-base/Table'

export default function FacebookNumbers() {

    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    <Button
                        // onClick={startTour}
                        className="title_font bg-blue-700 text-sm"
                        size={'sm'}
                    >
                        გაეცანი გვერდს
                    </Button>
                </div>

                <ScrollTrailText className="pl-5">
                    ნომრების ბაზაზე წარმოდგენილია ნომრების ცხრილი
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <div className="bg-gray-100 p-2 rounded flex flex-col gap-4 title_font">
                <Table modals={<FbStatisticModal/>}/>
            </div>

        </>
    )
}