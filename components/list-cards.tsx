import React from 'react'
import {ScrollTrailText} from "@/animations/ScrollTrailText";

type listCardsProps = {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function ListCards({children, title, description}: listCardsProps) {
    return (
        <div className={'flex flex-col gap-3 scroll-mt-28'} id={'dollar'}>
            <div className={'flex flex-wrap items-center gap-2'}>
                {children}

                <h1 className={'title_font'}>
                    <ScrollTrailText>{title}</ScrollTrailText>
                </h1>
            </div>

            <div className={'pl-3 max-w-[900px]'}>
                <ScrollTrailText>{description}</ScrollTrailText>
            </div>
        </div>)
}