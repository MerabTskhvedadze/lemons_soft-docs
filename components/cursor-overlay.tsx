'use client';
import {motion, AnimatePresence, useMotionValue, useSpring, Variants} from 'framer-motion';
import {useMousePosition} from '@/hooks/use-mouse-position';
import {useEffect, useRef, useState} from 'react';
import {ReactNode} from 'react';

export const CursorOverlay = ({content}: { content: ReactNode | null }) => {
    const {x, y} = useMousePosition();
    const [flipX, setFlipX] = useState(false);
    const [flipY, setFlipY] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const motionX = useMotionValue(0);
    const motionY = useMotionValue(0);

    const smoothX = useSpring(motionX, {stiffness: 250, damping: 25, mass: 0.6});
    const smoothY = useSpring(motionY, {stiffness: 250, damping: 25, mass: 0.6});

    useEffect(() => {
        motionX.set(x);
        motionY.set(y + 56);
    }, [x, y, motionX, motionY]);

    // Detect edge overflow based on cursor + overlay size
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const margin = 24;
        const w = window.innerWidth;
        const h = window.innerHeight;

        const width = el.offsetWidth;
        const height = el.offsetHeight;

        // Predict overlay position
        const predictedRight = x + width;
        const predictedBottom = y + height;

        const newFlipX = predictedRight > w - margin;
        const newFlipY = predictedBottom > h - margin;

        // ✅ Only update if the value actually changes
        setFlipX(prev => (prev !== newFlipX ? newFlipX : prev));
        setFlipY(prev => (prev !== newFlipY ? newFlipY : prev));
    }, [x, y, content]);

    const containerVariants: Variants = {
        hidden: {opacity: 0, scale: 0.85},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {type: 'spring', stiffness: 300, damping: 24, mass: 0.8},
        },
        exit: {opacity: 0, scale: 0.9},
    };

    const contentVariants: Variants = {
        hidden: {opacity: 0, scale: 0.9},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {delay: 0.12, duration: 0.25, ease: [0.25, 0.1, 0.25, 1]},
        },
        exit: {opacity: 0, scale: 0.95},
    };

    if (!content) return

    return (
        <AnimatePresence>
            <motion.div
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    key="container"
                    ref={containerRef}
                    className="text-indigo-800 bg-indigo-100 ring-2 ring-gray-200 px-3 pb-2 pt-1 rounded-md shadow-xl flex items-center justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                        position: 'relative',
                        transformOrigin: 'top left',
                        translateX: flipX ? '-100%' : '-100%',
                        translateY: flipY ? '-200%' : '0%',
                    }}
                >
                    <motion.div
                        key="content"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{pointerEvents: 'auto'}}
                    >
                        {content}
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};