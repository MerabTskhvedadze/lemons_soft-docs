import React from 'react';
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";

import SecondaryTable from "@/components/tables/SecondaryTable";
import {Chip} from "@mui/material";

import TableDocs from "@/components/tables/table-docs";

export default function NotInMeetings() {

    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 არ გამოცხადდნენ შეხვედრაზე</ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    ეს ცხრილი აჩვენებს Liddy-ებს, რომლებმაც ჰქონდათ ჩანიშნული შეხვედრა,
                    აქ ნაჩვენებია ჩანაწერები, რომლებიც მოდის ძირითადი <Chip size="small" label="ნომრების ბაზის"/> ცხრილიდან -
                    ესენი არიან Liddy-ები, რომლებსაც ჰქონდათ <b>ჩანიშნული შეხვედრა</b>, თუმცა <b>შეხვედრაზე არ
                    გამოცხადდნენ</b>.
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <TableDocs/>

            <Separator className="my-3 bg-transparent"/>

            <SecondaryTable/>
        </>
    )
}