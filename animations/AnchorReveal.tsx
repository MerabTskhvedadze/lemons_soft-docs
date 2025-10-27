'use client';

import { motion } from 'motion/react';

export function AnchorReveal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ boxShadow: '0 0 0 0px rgba(32, 201, 151, 0)' }}
            whileInView={{ boxShadow: '0 0 0 12px rgba(32, 201, 151, 0.15)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.7 }}
            className="rounded-md"
        >
            {children}
        </motion.div>
    );
}
