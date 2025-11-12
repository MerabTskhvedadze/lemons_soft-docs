'use client'

import React from "react";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";

import SecondaryTable from "@/components/tables/SecondaryTable";

export default function NotInMeetings() {

    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    "აღარ დაუკავშირდეთ" - გვერდის ცხრილშ ვარდება ნომრები რომლებიც არ პასუხობენ ზარებს ან გზავნიან NO SMS
                    - ს, ასეთ ნომრებს აღარ ვუკავშირდებით
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <SecondaryTable/>

        </>
    )
}