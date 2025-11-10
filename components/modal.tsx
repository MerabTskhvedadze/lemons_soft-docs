"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    type ReactNode, useId,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type MotionModalProps = {
    open: boolean;
    onCloseAction: () => void;
    title?: string;
    footer?: ReactNode;
    sizeClassName?: string;
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
    className?: string;
    children: ReactNode;
};

export function Modal(
    {
        open,
        onCloseAction,
        title,
        footer,
        sizeClassName = "max-w-lg",
        closeOnBackdrop = true,
        closeOnEsc = true,
        className = "",
        children,
    }: MotionModalProps) {
    const container = useMemo<HTMLElement | null>(() => {
        if (typeof window === "undefined") return null;
        return (document.getElementById("__next") as HTMLElement | null) ?? document.body;
    }, []);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // --- Focus management
    const panelRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    const getFocusable = useCallback((root: HTMLElement | null) => {
        if (!root) return [] as HTMLElement[];
        const selectors = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
        ].join(",");
        return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
            (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
        );
    }, []);

    useEffect(() => {
        if (!open) return;
        previouslyFocused.current = document.activeElement as HTMLElement | null;
        const id = requestAnimationFrame(() => {
            const focusables = getFocusable(panelRef.current);
            (focusables[0] ?? panelRef.current)?.focus();
        });
        return () => cancelAnimationFrame(id);
    }, [open, getFocusable]);

    useEffect(() => {
        if (open) return;
        previouslyFocused.current?.focus?.();
    }, [open]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Tab") {
                const nodes = getFocusable(panelRef.current);
                if (nodes.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = nodes[0];
                const last = nodes[nodes.length - 1];
                const active = document.activeElement as HTMLElement | null;

                if (e.shiftKey) {
                    if (active === first || !panelRef.current?.contains(active)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (active === last || !panelRef.current?.contains(active)) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
            if (closeOnEsc && e.key === "Escape") {
                e.stopPropagation();
                e.preventDefault();
                onCloseAction();
            }
        },
        [closeOnEsc, onCloseAction, getFocusable]
    );

    const onBackdropMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!closeOnBackdrop) return;
            if (e.target === e.currentTarget) onCloseAction();
        },
        [closeOnBackdrop, onCloseAction]
    );

    const backdropVariants = useMemo(
        () => ({
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
            exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
        }),
        []
    );

    const panelVariants = useMemo(
        () => ({
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
            exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: "easeIn" } },
        }),
        []
    );

    const reactId = useId();
    const titleId = `${reactId}-modal-title`;

    // No portal target on server → render nothing (SSR-safe)
    if (!container) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    key="backdrop"
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? titleId.current : undefined}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={backdropVariants}
                    onMouseDown={onBackdropMouseDown}
                >
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/50"
                        variants={backdropVariants}
                    />
                    <motion.div
                        role="document"
                        ref={panelRef}
                        tabIndex={-1}
                        className={`relative z-[101] w-full ${sizeClassName} focus:outline-none`}
                        variants={panelVariants}
                        onKeyDown={handleKeyDown}
                    >
                        <div className={`rounded shadow-xl ring-1 ring-black/10 bg-white ${className}`}>
                            {(title) && (
                                <div
                                    className="flex items-center justify-between gap-4 px-5 py-3 border-b border-black/5">
                                    <h2 id={titleId}
                                        className="text-base font-semibold tracking-tight text-neutral-900">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onCloseAction}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
                                        aria-label="Close dialog"
                                        type="button"
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"
                                            aria-hidden="true">
                                            <path
                                                d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59 7.71 6.29a1 1 0 10-1.42 1.42L10.59 12l-4.3 4.29a1 1 0 101.42 1.42L12 13.41l4.29 4.3a1 1 0 001.42-1.42z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <div className="px-5 py-4 text-neutral-800">{children}</div>
                            {footer && (
                                <div className="px-5 py-3 border-t border-black/5 bg-neutral-50/50 rounded-b-2xl">
                                    {footer}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        container
    );
}