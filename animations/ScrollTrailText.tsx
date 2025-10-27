'use client';

import {
    motion,
    useScroll,
    useVelocity,
    useSpring,
    useTransform,
    useReducedMotion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
} from 'motion/react';
import { PropsWithChildren, CSSProperties } from 'react';

type ScrollTrailTextProps = PropsWithChildren<{
    layers?: number;        // number of ghost layers
    maxOffset?: number;     // px cap for closest layer
    offsetGain?: number;    // px/s -> px mapping
    blur?: number;          // blur on ghosts
    maxAlpha?: number;      // peak opacity of closest ghost (0..1)
    decay?: number;         // opacity falloff per layer (0..1)
    damping?: number;       // spring damping for motion smoothing
    stiffness?: number;     // spring stiffness
    onThreshold?: number;   // px/s to turn ON (hysteresis high)
    offThreshold?: number;  // px/s to turn OFF (hysteresis low)
    knee?: number;          // px/s width to feather opacity above onThreshold
    className?: string;
    style?: CSSProperties;
}>;

/**
 * Velocity-reactive text trail with hysteresis, soft-knee opacity, and
 * reduced-motion support.
 */
export function ScrollTrailText({
                                    children,
                                    layers = 3,
                                    maxOffset = 20,
                                    offsetGain = 0.018,
                                    blur = 5,
                                    maxAlpha = 0.25,
                                    decay = 0.48,
                                    damping = 34,
                                    stiffness = 180,
                                    onThreshold = 320,
                                    offThreshold = 220,
                                    knee = 260,
                                    className,
                                    style,
                                }: ScrollTrailTextProps) {
    const reduce = useReducedMotion();
    const { scrollY } = useScroll();
    const vRaw = useVelocity(scrollY); // MotionValue<number>

    // absolute speed (px/s)
    const speed = useTransform<number, number>(vRaw, (vel: number) => Math.abs(vel));

    // Gate with hysteresis to prevent flicker near threshold
    const active = useMotionValue<number>(0);
    useMotionValueEvent(speed, 'change', (s) => {
        if (reduce) return void active.set(0);
        if (s > onThreshold) active.set(1);
        else if (s < offThreshold) active.set(0);
    });

    // Unsmoothed per-frame offset in the opposite direction of travel
    const offsetUnsmoothed = useTransform<number, number>(vRaw, (vel: number) => {
        if (reduce) return 0;
        const off = -vel * offsetGain;
        return Math.max(-maxOffset, Math.min(maxOffset, off));
    });

    // Smooth the motion, but we’ll hard-cut to 0 when inactive
    const offsetSpring = useSpring(offsetUnsmoothed, { damping, stiffness });

    // --- IMPORTANT: make inputs a typed tuple and the transformer param a tuple ---
    const baseOffsetInputs = [offsetSpring, active] as [
        MotionValue<number>,
        MotionValue<number>
    ];

    // Snap offset to 0 when inactive (no lingering)
    const baseOffset = useTransform(
        [offsetSpring, active],
        (values) => {
            const [o, a] = values as number[];
            return a ? o : 0;
        }
    );

    // Soft-knee opacity: fades in over `knee` px/s above the onThreshold
    const kneeAlpha = useTransform<number, number>(speed, (s: number) => {
        if (reduce) return 0;
        const t = Math.min(Math.max((s - onThreshold) / Math.max(knee, 1), 0), 1); // 0..1
        return t * maxAlpha;
    });

    // Gate opacity to 0 when inactive
    const baseAlpha = useTransform(
        [kneeAlpha, active],
        (values) => {
            const [a, on] = values as number[];
            return on ? a : 0;
        }
    );

    return (
        <span
            className={className}
            style={{
                position: 'relative',
                display: 'inline-block',
                willChange: 'transform',
                ...style,
            }}
        >
      {/* Ghost layers behind the text */}
            {Array.from({ length: layers }, (_, idx) => (
                <GhostLayer
                    key={idx}
                    index={idx + 1}
                    baseOffset={baseOffset}
                    baseAlpha={baseAlpha}
                    decay={decay}
                    blur={blur}
                >
                    {children}
                </GhostLayer>
            ))}

            {/* Foreground text */}
            <span style={{ position: 'relative' }}>{children}</span>
    </span>
    );
}

/** One ghost/streak layer. Hooks live here, not inside a .map (✅ Rules of Hooks). */
function GhostLayer({
                        index,
                        baseOffset,
                        baseAlpha,
                        decay,
                        blur,
                        children,
                    }: PropsWithChildren<{
    index: number;                       // 1-based
    baseOffset: MotionValue<number>;
    baseAlpha: MotionValue<number>;
    decay: number;
    blur: number;
}>) {
    const y = useTransform<number, number>(baseOffset, (o: number) => o * index);
    const opacity = useTransform<number, number>(
        baseAlpha,
        (a: number) => a * Math.pow(decay, index - 1)
    );

    return (
        <motion.span
            aria-hidden
            style={{
                position: 'absolute',
                inset: 0,
                y,
                opacity,
                filter: `blur(${blur}px)`,
                pointerEvents: 'none',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                borderRadius: 4,
                willChange: 'transform, opacity, filter',
            }}
        >
            {children}
        </motion.span>
    );
}


// 'use client';
//
// import {
//     motion,
//     useScroll,
//     useVelocity,
//     useSpring,
//     useTransform,
//     useReducedMotion,
//     MotionValue,
//     useMotionValue,
//     useMotionValueEvent,
// } from 'framer-motion';
// import {PropsWithChildren, CSSProperties, useMemo} from 'react';
//
// type ScrollTrailTextProps = PropsWithChildren<{
//     layers?: number;        // number of ghost layers
//     maxOffset?: number;     // px cap for closest layer
//     offsetGain?: number;    // px/s -> px mapping
//     blur?: number;          // blur on ghosts
//     maxAlpha?: number;      // peak opacity of closest ghost (0..1)
//     decay?: number;         // opacity falloff per layer (0..1)
//     damping?: number;       // spring damping for motion smoothing
//     stiffness?: number;     // spring stiffness
//     onThreshold?: number;   // px/s to turn ON (hysteresis high)
//     offThreshold?: number;  // px/s to turn OFF (hysteresis low)
//     knee?: number;          // px/s width to feather opacity above onThreshold
//     className?: string;
//     style?: CSSProperties;
// }>;
//
// /**
//  * Velocity-reactive text trail that:
//  * - only activates above a high velocity (hysteresis: on/off thresholds)
//  * - feathers opacity with a “soft knee” so it doesn’t pop in
//  * - snaps off instantly when scrolling stops
//  * - respects prefers-reduced-motion
//  */
// export function ScrollTrailText(
//     {
//         children,
//         layers = 3,
//         maxOffset = 20,
//         offsetGain = 0.018,   // less sensitive by default
//         blur = 5,
//         maxAlpha = 0.25,      // subtler by default
//         decay = 0.48,         // faster layer fade
//         damping = 34,
//         stiffness = 180,
//         onThreshold = 320,    // turn on only on real flings
//         offThreshold = 220,   // turn off sooner to avoid lingering
//         knee = 260,           // feather band above onThreshold
//         className,
//         style,
//     }: ScrollTrailTextProps) {
//     const reduce = useReducedMotion();
//     const {scrollY} = useScroll();
//     const vRaw = useVelocity(scrollY); // px/s (signed)
//
//     // absolute speed (px/s)
//     const speed = useTransform(vRaw, (vel) => Math.abs(vel));
//
//     // Gate with hysteresis to prevent flicker near threshold
//     const active = useMotionValue(0);
//     useMotionValueEvent(speed, 'change', (s) => {
//         if (reduce) return void active.set(0);
//         if (s > onThreshold) active.set(1);
//         else if (s < offThreshold) active.set(0);
//     });
//
//     // Unsmoothed per-frame offset in the opposite direction of travel
//     const offsetUnsmoothed = useTransform(vRaw, (vel) => {
//         if (reduce) return 0;
//         const off = -vel * offsetGain;
//         return Math.max(-maxOffset, Math.min(maxOffset, off));
//     });
//
//     // Smooth the motion, but we’ll hard-cut to 0 when inactive
//     const offsetSpring = useSpring(offsetUnsmoothed, {damping, stiffness});
//
//     // Snap offset to 0 when inactive (no lingering)
//     const baseOffset = useTransform([offsetSpring, active], ([o, a]) => (a ? o : 0));
//
//     // Soft-knee opacity: fades in over `knee` px/s above the onThreshold
//     const kneeAlpha = useTransform(speed, (s) => {
//         if (reduce) return 0;
//         const t = Math.min(Math.max((s - onThreshold) / Math.max(knee, 1), 0), 1); // 0..1
//         return t * maxAlpha;
//     });
//
//     // Gate opacity to 0 when inactive
//     const baseAlpha = useTransform([kneeAlpha, active], ([a, on]) => (on ? a : 0));
//
//     // Build per-layer transforms
//     const layerIdx = useMemo(() => Array.from({length: layers}, (_, i) => i + 1), [layers]);
//     const offsets: MotionValue<number>[] = layerIdx.map((i) =>
//         useTransform(baseOffset, (o) => o * i)
//     );
//     const opacities: MotionValue<number>[] = layerIdx.map((i) =>
//         useTransform(baseAlpha, (a) => a * Math.pow(decay, i - 1))
//     );
//
//     return (
//         <span
//             className={className}
//             style={{
//                 position: 'relative',
//                 display: 'inline-block',
//                 willChange: 'transform',
//                 ...style,
//             }}
//         >
//       {layerIdx.map((i, idx) => (
//           <motion.span
//               key={i}
//               aria-hidden
//               style={{
//                   position: 'absolute',
//                   inset: 0,
//                   y: offsets[idx],
//                   opacity: opacities[idx],
//                   filter: `blur(${blur}px)`,
//                   pointerEvents: 'none',
//                   WebkitFontSmoothing: 'antialiased',
//                   MozOsxFontSmoothing: 'grayscale',
//                   borderRadius: 4,
//               }}
//           >
//               {children}
//           </motion.span>
//       ))}
//             <span style={{position: 'relative'}}>{children}</span>
//     </span>
//     );
// }