'use client';

import {
    motion,
    useScroll,
    useVelocity,
    useSpring,
    useTransform,
    useMotionTemplate,
    useReducedMotion
} from 'framer-motion';
import {PropsWithChildren, CSSProperties} from 'react';

type ScrollStreakTextProps = PropsWithChildren<{
    /** Max vertical shake in px */
    maxShift?: number;
    /** How strongly velocity maps to shift (bigger = more movement) */
    shiftGain?: number;
    /** Max streak opacity (0–1) */
    maxStreakAlpha?: number;
    /** Spring smoothing for velocity */
    damping?: number;
    stiffness?: number;
    /** Optional style/className passthroughs */
    style?: CSSProperties;
    className?: string;
}>;

/**
 * Text that "shakes" up/down a little when you scroll fast,
 * with a faint opposite-direction streak like motion blur.
 */
export function ScrollStreakText(
    {
        children,
        maxShift = 4,         // px
        shiftGain = 0.012,     // maps px/s -> px shift
        maxStreakAlpha = 0.35, // opacity ceiling for the streak
        damping = 30,
        stiffness = 180,
        style,
        className,
    }: ScrollStreakTextProps) {
    const reduce = useReducedMotion();

    // Global page scroll
    const {scrollY} = useScroll();

    // Instantaneous velocity of scrollY (px / second)
    const rawVelocity = useVelocity(scrollY);

    // Soften the velocity so the effect feels elastic, not jittery
    const v = useSpring(rawVelocity, {damping, stiffness});

    // Translate velocity -> vertical shift (px), clamped to ±maxShift
    const y = useTransform(v, (vel) => {
        if (reduce) return 0;
        const shift = vel * shiftGain;
        return Math.max(-maxShift, Math.min(maxShift, shift));
    });

    // Streak goes in the *opposite* direction of movement
    const streakOffset = useTransform(y, (yy) => (reduce ? 0 : -yy * 3)); // exaggerate a bit

    // Streak opacity scales with velocity magnitude, capped
    const streakAlpha = useTransform(v, (vel) => {
        if (reduce) return 0;
        const a = Math.min(Math.abs(vel) * 0.0002, maxStreakAlpha); // tune factor
        return +a.toFixed(3);
    });

    // Build a layered text-shadow for a soft vertical trail
    // You can adjust multipliers / counts for thicker or thinner streaks.
    const textShadow = useMotionTemplate`
    0 ${streakOffset}px 0 rgba(0,0,0, ${streakAlpha}),
    0 ${streakOffset * 1.8}px 0 rgba(0,0,0, ${streakAlpha * 0.6}),
    0 ${streakOffset * 2.6}px 0 rgba(0,0,0, ${streakAlpha * 0.35})
  `;

    return (
        <motion.span
            style={{
                display: 'inline-block',
                y,
                textShadow,
                willChange: 'transform, text-shadow',
                // helpful if your font is thin; prevents subpixel fuzz
                WebkitFontSmoothing: 'antialiased',
                ...style,
            }}
            className={className}
        >
            {children}
        </motion.span>
    );
}
