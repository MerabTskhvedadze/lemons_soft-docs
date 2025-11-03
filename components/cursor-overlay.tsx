'use client';
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useEffect } from 'react';
import { ReactNode } from 'react';

export const CursorOverlay = ({ content }: { content: ReactNode | null }) => {
    const { x, y } = useMousePosition();

    // Create motion values for x and y
    const motionX = useMotionValue(0);
    const motionY = useMotionValue(0);

    // Apply spring smoothing
    const smoothX = useSpring(motionX, {
        stiffness: 250,
        damping: 25,
        mass: 0.6,
    });
    const smoothY = useSpring(motionY, {
        stiffness: 250,
        damping: 25,
        mass: 0.6,
    });

    // Update motion values when mouse moves
    useEffect(() => {
        motionX.set(x);
        motionY.set(y);
    }, [x, y, motionX, motionY]);

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
                mass: 0.8,
            },
        },
        exit: { opacity: 0, scale: 0.9 },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.12,
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: { opacity: 0, scale: 0.95 },
    };

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: -110,
                left: -50,
                pointerEvents: 'none',
                zIndex: 9999,
                x: smoothX,
                y: smoothY,
            }}
        >
            <AnimatePresence>
                {content && (
                    <motion.div
                        key="container"
                        className="text-indigo-800 bg-indigo-100 ring-2 ring-gray-200 px-3 pb-2 pt-1 rounded-md shadow-xl flex items-center justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            key="content"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{ pointerEvents: 'auto' }}
                        >
                            {content}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};