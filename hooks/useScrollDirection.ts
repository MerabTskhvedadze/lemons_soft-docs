import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 6) {
    const [dir, setDir] = useState<"up" | "down">("up");
    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            const y = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const delta = y - lastY;
                    if (Math.abs(delta) > threshold) setDir(delta > 0 ? "down" : "up");
                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return dir;
}
