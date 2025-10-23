'use client';

import { motion } from 'framer-motion';

export function GrowUnderline({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-block">
            <div className="mb-1">{children}</div>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-[2px] bg-black/20 origin-left"
            />
        </div>
    );
}
