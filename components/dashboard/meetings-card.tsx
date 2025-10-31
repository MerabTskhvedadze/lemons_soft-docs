import React from "react";
import {Chip} from "@/components/chip";

export function MeetingsCard(
    {agent, total, meetings}: { agent?: string, total?: number, meetings: { project: string, count: number }[] }
) {
    return (
        <div
            className={'h-fit border rounded-md py-3 px-3 flex flex-col gap-2 bg-[linear-gradient(180deg,#fff,#fafbff)]'}
        >
            <div className={' font-bold flex items-center gap-4 justify-between'}>
                <h1 className={'text-sm'}>{agent}</h1>
                <span className={'text-xs'}>სულ: {total}</span>
            </div>

            <div className={'flex flex-wrap gap-2'}>
                {meetings.map((meet, i) => (
                    <Chip key={i} title={meet.project} count={meet.count}/>
                ))}
            </div>
        </div>
    )
}