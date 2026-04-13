import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md w-full flex flex-col items-center gap-6">
        <p
          className="text-xs tracking-widest uppercase text-neutral-500"
          style={fadeUp(0)}
        >
          Error 404
        </p>

        <h1 className="text-6xl font-medium text-white" style={fadeUp(100)}>
          Lost?
        </h1>

        <p
          className="text-sm text-neutral-400 leading-relaxed"
          style={fadeUp(200)}
        >
          This page doesn't exist or was moved. Happens to the best of us.
        </p>

        <div
          className="h-px w-10 bg-neutral-800"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition:
              "opacity 600ms ease 300ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 300ms",
          }}
        />

        <button
          onClick={() => navigate("/")}
          className="text-sm text-neutral-400 border border-neutral-700 rounded-xl px-5 py-2.5 hover:bg-neutral-800 hover:text-white hover:border-neutral-500 transition-colors duration-200"
          style={fadeUp(400)}
        >
          Take me home
        </button>
      </div>
    </div>
  );
};
