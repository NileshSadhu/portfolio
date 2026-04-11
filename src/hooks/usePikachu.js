import { useEffect, useRef, useState } from "react";

export const usePikachu = (active) => {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [sleeping, setSleeping] = useState(true);
    const [direction, setDirection] = useState("right");
    const target = useRef({ x: -200, y: -200 });
    const current = useRef({ x: -200, y: -200 });
    const prevX = useRef(null);
    const rafRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        const onMove = (e) => {
            if (prevX.current !== null) {
                const dx = e.clientX - prevX.current;
                if (Math.abs(dx) > 1.5) {
                    setDirection(dx > 0 ? "right" : "left");
                }
            }
            prevX.current = e.clientX;
            target.current = { x: e.clientX, y: e.clientY };
            setSleeping(false);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setSleeping(true), 2500);
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        const tick = () => {
            const cx = lerp(current.current.x, target.current.x, 0.08);
            const cy = lerp(current.current.y, target.current.y, 0.08);
            current.current = { x: cx, y: cy };
            setPos({ x: cx, y: cy });
            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove);
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [active]);

    return { pos, sleeping, direction };
};