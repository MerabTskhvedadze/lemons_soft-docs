import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import React from "react";
import FileInput from '@/components/file-input'

export default function OrcImport() {
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

            <div className={'flex flex-col gap-3 bg-gray-100 p-3 rounded'}>
                <h1>📄 OCR + Field Mapping</h1>
                <FileInput/>
            </div>
        </>
    )
}