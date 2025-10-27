'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxStrip({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const y = useTransform(scrollYProgress, [0, 1], [20, -20]); // mild parallax

    return (
        <motion.div ref={ref} style={{ y }}>
            {children}
        </motion.div>
    );
}
