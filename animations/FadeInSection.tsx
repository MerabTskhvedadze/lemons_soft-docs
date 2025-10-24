'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function FadeInSection({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
