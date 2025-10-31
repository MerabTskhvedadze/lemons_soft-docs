import React from "react";

export function Card(
    {
        title, icon, footer, children, className
    }: {
        title: string | React.ReactNode,
        icon?: React.ReactNode,
        footer?: React.ReactNode,
        children?: React.ReactNode,
        className?: string
    }) {
    return (
        <div className={`shadow w-full bg-white p-3 flex flex-col gap-3 ${className || ''}`}>
            <header className="flex items-center gap-2 justify-between">
                <div className="title_font text-xs w-full">{title}</div>
                {icon && (
                    <p className="flex items-center gap-2">
                        <span className="history p-1 bg-blue-700 rounded-full">
                          {icon}
                        </span>
                    </p>
                )}
            </header>

            {children}

            {footer && <footer className="mt-auto">{footer}</footer>}
        </div>
    )
}