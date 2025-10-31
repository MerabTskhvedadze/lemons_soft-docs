// ProgressBar.tsx
import React from "react";

type Size = "sm" | "md" | "lg";
type Variant = "compact" | "detailed" | "footer2" | "double";

type Props = {
    value: number;            // primary (e.g., done)
    /** For "double": secondary (e.g., scheduled/forecast). May be >= value */
    secondaryValue?: number;
    max?: number;
    variant?: Variant;
    size?: Size;
    leftLabel?: React.ReactNode;
    rightLabel?: React.ReactNode;
    showNumbers?: boolean;
    className?: string;

    /** Color controls (hex/rgb/hsl allowed) */
    trackColor?: string;    // e.g. "#eef2f7"
    fillFrom?: string;      // primary gradient start
    fillTo?: string;        // primary gradient end
    fillColor?: string;     // primary solid
    /** Secondary (“background fill”) colors for Variant="double" */
    secondaryFrom?: string;
    secondaryTo?: string;
    secondaryColor?: string;

    /** Optional escape hatch for Tailwind classes */
    trackClassName?: string;
    fillClassName?: string;        // primary fill classes
    secondaryFillClassName?: string; // secondary fill classes
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const sizeMap: Record<Size, { bar: string; text: string; gap: string }> = {
    sm: { bar: "h-1.5 rounded-full", text: "text-xs", gap: "gap-1" },
    md: { bar: "h-2.5 rounded-full", text: "text-sm", gap: "gap-1.5" },
    lg: { bar: "h-4 rounded-full", text: "text-base", gap: "gap-2" },
};

export function ProgressBar({
                                value,
                                secondaryValue,
                                max = 100,
                                variant = "compact",
                                size = "md",
                                leftLabel,
                                rightLabel,
                                showNumbers = variant === "detailed" || variant === "footer2",
                                className = "",
                                trackColor,
                                fillFrom,
                                fillTo,
                                fillColor,
                                secondaryFrom,
                                secondaryTo,
                                secondaryColor,
                                trackClassName = "bg-slate-200/80",
                                fillClassName = "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]",
                                secondaryFillClassName = "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]",
                            }: Props) {
    const pct = max > 0 ? clamp((value / max) * 100) : 0;
    const secondaryPct =
        variant === "double"
            ? max > 0
                ? clamp(((secondaryValue ?? value) / max) * 100)
                : 0
            : 0;

    const sm = sizeMap[size];

    // Track style
    const trackStyle: React.CSSProperties = {};
    if (trackColor) trackStyle.backgroundColor = trackColor;

    // Primary fill style
    const fillStyle: React.CSSProperties = { width: `${pct}%` };
    const useDefaultPrimaryGradient = !fillFrom && !fillTo && !fillColor;
    if (fillFrom && fillTo) {
        fillStyle.backgroundImage = `linear-gradient(to right, ${fillFrom}, ${fillTo})`;
    } else if (fillColor) {
        fillStyle.backgroundColor = fillColor;
    }

    // Secondary fill style (for "double")
    const secondaryStyle: React.CSSProperties = { width: `${Math.max(pct, secondaryPct)}%` };
    const useDefaultSecondaryGradient =
        variant === "double" && !secondaryFrom && !secondaryTo && !secondaryColor;

    if (secondaryFrom && secondaryTo) {
        secondaryStyle.backgroundImage = `linear-gradient(to right, ${secondaryFrom}, ${secondaryTo})`;
    } else if (secondaryColor) {
        secondaryStyle.backgroundColor = secondaryColor;
    }

    return (
        <div className={className}>
            {(leftLabel || rightLabel) && (
                <div className={`flex items-baseline justify-between ${sm.text} ${sm.gap} mb-1`}>
                    <div className="font-semibold text-slate-800">{leftLabel}</div>
                    <div className="font-semibold text-slate-800/80">
                        {variant === "detailed" ? `${pct.toFixed(1)}%` : rightLabel}
                    </div>
                </div>
            )}

            {/* Track */}
            <div className={`relative w-full overflow-hidden ${sm.bar} ${trackClassName}`} style={trackStyle}>
                {/* Secondary fill (goes first, underneath) */}
                {variant === "double" && (
                    <div
                        className={`absolute left-0 top-0 h-full transition-all duration-300 ease-in-out
              ${useDefaultSecondaryGradient ? "bg-gradient-to-r from-[#a8f0b7] to-[#78d88f]" : ""}
              ${secondaryFillClassName}`}
                        style={secondaryStyle}
                    />
                )}

                {/* Primary fill (on top) */}
                <div
                    className={`relative h-full transition-all duration-300 ease-in-out
            ${useDefaultPrimaryGradient ? "bg-gradient-to-r from-[#4cd964] to-[#1aa64b]" : ""}
            ${fillClassName}`}
                    style={fillStyle}
                />
            </div>

            {variant === "detailed" && showNumbers && (
                <div className={`mt-1 flex items-center justify-between ${sm.text}`}>
                    <div className="text-slate-700/80">{value.toLocaleString()}</div>
                    <div className="font-semibold text-slate-800/90">{max.toLocaleString()}</div>
                </div>
            )}

            {variant === "footer2" && showNumbers && (
                <div className={`mt-1 flex items-center justify-between ${sm.text}`}>
                    <div className="text-slate-700/80">
                        {value.toLocaleString()} / {max.toLocaleString()}
                    </div>
                    <div className="font-semibold text-slate-800/90">{pct.toFixed(1)}%</div>
                </div>
            )}
        </div>
    );
}
