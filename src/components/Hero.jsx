import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCommand } from "react-icons/lu";
import { CommandMenu } from "./CommandMenu";
import profile from "../assets/profile.jpg";

export const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ctrl+cmd global open
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setMenuOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fadeUp = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0) scale(1)"
      : "translateY(16px) scale(0.97)",
    transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <>
      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section
        ref={sectionRef}
        className="flex min-h-screen items-center justify-center px-6"
      >
        <div className="max-w-xl w-full flex flex-col gap-8">
          {/* Avatar + name + location */}
          <div className="flex items-center gap-4" style={fadeUp(0)}>
            <div className="relative">
              <img
                src={profile}
                alt="Nilesh Sadhu"
                className="h-25 w-25 rounded object-cover border border-neutral-700"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </div>
            <div>
              <p className="text-white font-medium text-base leading-tight">
                Nilesh Sadhu
              </p>
              <span className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                <IoLocationOutline size={12} />
                Mumbai, India
              </span>
            </div>
          </div>

          {/* Heading */}
          <div style={fadeUp(100)}>
            <p className="text-xs tracking-widest uppercase text-neutral-500 mb-3">
              Web Developer
            </p>
            <h1 className="text-4xl font-medium text-white leading-tight">
              I build things for the web.
            </h1>
          </div>

          {/* Bio */}
          <p
            className="text-neutral-400 text-sm leading-relaxed"
            style={fadeUp(200)}
          >
            Recently graduated with a Bachelor of Science from Mumbai
            University. I love to build, design, and bring ideas to life through
            code. Outside of development I enjoy travelling and music.
          </p>

          {/* Divider */}
          <div
            className="h-px bg-neutral-800"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:
                "opacity 600ms ease 300ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
            }}
          />

          {/* CTA row */}
          <div
            className="flex items-center gap-3 flex-wrap"
            style={fadeUp(400)}
          >
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 text-sm font-medium text-white bg-neutral-800 border border-neutral-700 rounded-xl px-5 py-2.5 hover:bg-neutral-700 hover:border-neutral-500 transition-colors duration-200"
            >
              <FaDownload size={13} />
              Resume
            </a>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center justify-center h-9 w-9 rounded-xl border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
                title="Open command menu (Ctrl+K)"
              >
                <LuCommand size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
