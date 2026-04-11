import { useEffect, useState } from "react";
import { PikachuCursor } from "./PikachuCursor";

const commands = [
  {
    key: "ctrl+p",
    label: "Summon Pikachu",
    description: "A wild Pikachu appears 🐾",
    action: "pikachu",
  },
  // { key: "ctrl+b", label: "Go to blog", description: "Read my latest posts" },
  // {
  //   key: "ctrl+r",
  //   label: "Download resume",
  //   description: "Get my resume as PDF",
  // },
];

export const CommandMenu = ({ open, onClose }) => {
  const [pikachu, setPikachu] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        setPikachu(true);
      }
      if (e.key === "Escape") {
        onClose();
        setPikachu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) setPikachu(false);
  }, [open]);

  if (!open) return <PikachuCursor active={pikachu} />;

  return (
    <>
      <PikachuCursor active={pikachu} />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        style={{ animation: "fadeIn 150ms ease" }}
        onClick={() => {
          onClose();
          setPikachu(false);
        }}
      />

      {/* Panel */}
      <div
        className="fixed z-50 left-1/2 top-1/3 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
        style={{ animation: "slideUp 200ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="mx-4 rounded-2xl border border-neutral-700 bg-zinc-900 overflow-hidden shadow-2xl">
          {/* Command list */}
          <ul className="py-2 max-h-64 overflow-y-auto">
            {commands.map((cmd) => (
              <li key={cmd.key}>
                <button
                  onClick={() => {
                    if (cmd.action === "pikachu") setPikachu((p) => !p);
                  }}
                  className="w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left hover:bg-neutral-800 transition-colors duration-150 group"
                >
                  <div>
                    <p className="text-sm text-neutral-200 group-hover:text-white transition-colors">
                      {cmd.label}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {cmd.description}
                    </p>
                  </div>
                  <kbd className="shrink-0 text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 rounded px-2 py-0.5 group-hover:border-neutral-600 transition-colors">
                    {cmd.key}
                  </kbd>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)) scale(0.97) }
                             to   { opacity: 1; transform: translate(-50%, -50%) scale(1) } }
      `}</style>
    </>
  );
};
