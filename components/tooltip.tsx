import React from "react";

export function Tooltip({title, description}: { title: string; description: string }) {
    return (
        <div className={'max-w-64 '}>
            <h1 className={'text-lg'}>{title}</h1>
            <p className={'text-xs'}>{description}</p>
        </div>
    )
}