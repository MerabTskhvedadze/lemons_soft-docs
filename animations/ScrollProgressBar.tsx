'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed left-0 top-0 h-1 w-full origin-left bg-[#3b7ddd] z-[100]"
        />
    );
}
