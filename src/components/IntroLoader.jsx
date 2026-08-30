import { useEffect, useState, useRef } from "react";

const GREETINGS = [
  {
    code: "EN",
    lang: "English",
    text: "Hello, I'm Nilesh Sadhu",
    fontFamily: "Inter, sans-serif",
  },
  {
    code: "HI",
    lang: "Hindi",
    text: "नमस्ते, मैं नीलेश साधु हूँ",
    fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
  },
  {
    code: "MR",
    lang: "Marathi",
    text: "नमस्कार, मी नीलेश साधू",
    fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
  },
  {
    code: "GU",
    lang: "Gujarati",
    text: "નમસ્તે, હું નીલેશ સાધુ છું",
    fontFamily: "'Noto Sans Gujarati', 'Inter', sans-serif",
  },
  {
    code: "TE",
    lang: "Telugu",
    text: "నమస్కారం, నేను నీలేష్ సాధు",
    fontFamily: "'Noto Sans Telugu', 'Inter', sans-serif",
  },
];

const STEP_DURATION = 2000; // 2 seconds per language
const FADE_OUT_OFFSET = 300; // start fade out 300ms before step ends

export const IntroLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState("in"); // "in" | "out"
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Allow the smooth reveal animation to finish before removing from DOM
    setTimeout(() => {
      onComplete?.();
    }, 850);
  };

  useEffect(() => {
    // Lock body scrolling during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard shortcut to skip (ESC or Space or Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExiting]);

  // Cycle through languages
  useEffect(() => {
    if (isExiting) return;

    setFadeState("in");

    // Schedule fade out slightly before the 2s window closes
    fadeTimerRef.current = setTimeout(() => {
      setFadeState("out");
    }, STEP_DURATION - FADE_OUT_OFFSET);

    // Schedule switch to next language or complete
    timerRef.current = setTimeout(() => {
      if (index < GREETINGS.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        handleFinish();
      }
    }, STEP_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [index, isExiting]);

  const current = GREETINGS[index];

  return (
    <aside
      aria-label="Website Introduction"
      aria-live="polite"
      className="intro-loader-screen fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black text-white px-6 py-10 select-none cursor-default"
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition:
          "transform 800ms cubic-bezier(0.76, 0, 0.24, 1), opacity 800ms ease, background-color 300ms ease, color 300ms ease",
        opacity: isExiting ? 0.95 : 1,
        willChange: "transform",
      }}
    >
      {/* Top Bar: Language Badge & Skip Action */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-500 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{current.lang}</span>
        </div>

        <button
          onClick={handleFinish}
          className="intro-skip-btn text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-800 transition-all duration-200 tracking-wide font-medium"
        >
          Skip Intro
        </button>
      </div>

      {/* Centered Multilingual Greeting */}
      <main className="my-auto flex flex-col items-center justify-center text-center px-4 max-w-3xl">
        <div
          className="transition-all duration-300 transform"
          style={{
            fontFamily: current.fontFamily,
            opacity: fadeState === "in" && !isExiting ? 1 : 0,
            transform:
              fadeState === "in" && !isExiting
                ? "translateY(0px) scale(1)"
                : "translateY(-12px) scale(0.98)",
            filter:
              fadeState === "in" && !isExiting ? "blur(0px)" : "blur(4px)",
            transition:
              "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease",
          }}
        >
          <h1 className="intro-text text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-neutral-100">
            {current.text}
          </h1>
        </div>
      </main>

      {/* Bottom Progress Bar & Steps Indicator */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {GREETINGS.map((item, i) => (
            <div
              key={item.code}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "intro-dot-active w-8 bg-white"
                  : i < index
                    ? "intro-dot-passed w-2 bg-neutral-600"
                    : "intro-dot-future w-2 bg-neutral-800"
              }`}
              title={item.lang}
            />
          ))}
        </div>
        <span className="intro-step-counter text-[11px] text-neutral-600 font-mono tracking-widest">
          {index + 1} / {GREETINGS.length}
        </span>
      </div>
    </aside>
  );
};
