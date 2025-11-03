'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import {CursorOverlay} from '@/components/cursor-overlay'

type CursorContextType = {
    setCursor: (content: ReactNode | null) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [cursorContent, setCursorContent] = useState<ReactNode | null>(null);

    return (
        <CursorContext.Provider value={{ setCursor: setCursorContent }}>
            {children}
            <CursorOverlay content={cursorContent} />
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    const ctx = useContext(CursorContext);
    if (!ctx) throw new Error('useCursor must be used within CursorProvider');
    return ctx;
};
