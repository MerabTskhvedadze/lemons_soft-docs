import React, { ReactNode, HTMLAttributes } from 'react';

interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    dot?: boolean;
    title: ReactNode; // now your own "title" prop
    count?: number;
    className?: string;
    bg?: string;
}

export function Chip({
    dot = true,
    title,
    count,
    className,
    bg,
    ...otherProps
}: ChipProps) {
    return (
        <div
            className={`
                py-1.5 px-2.5 text-sm flex items-center justify-center gap-1
                bg-[hsla(80,51%,76%,.42)] w-fit rounded-full
                transition-all duration-[250ms] ease-[ease]
                hover:-translate-y-[0.3px] hover:scale-[1.01]
                hover:shadow-[0_0_12px_rgba(0,0,0,0.15),0_0_8px_rgba(0,150,255,0.2)]
                cursor-default
                ${className || ''}
              `}
            style={{ background: bg }}
            {...otherProps}
        >
            {dot && <span className="block h-2 w-2 rounded-full bg-red-500" />}
            <span>{title}</span>
            {count && (
                <span className="font-bold py-1 px-2.5 text-center text-white bg-[#96d370] rounded-md title_font text-xs">
                    {count}
                </span>
            )}
        </div>
    );
}
