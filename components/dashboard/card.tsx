import React from "react";

// Omit the standard HTML 'title' attribute from the inherited props
interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    title: string | React.ReactNode; // Your custom prop type
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export function Card(
    {
        title,
        icon,
        footer,
        children,
        className,
        ...otherProps
    }: CardProps) {
    return (
        // The 'otherProps' will not contain your custom 'title' prop
        // but can still contain other valid div attributes like 'id', 'style', etc.
        <div className={`shadow w-full bg-white p-3 flex flex-col gap-3 ${className || ''}`} {...otherProps}>
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