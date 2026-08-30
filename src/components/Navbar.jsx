import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const navItems = [
  { label: "Home", href: "home" },
  { label: "Experience", href: "experience" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Blog", href: "blog" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = navItems.find(
              (item) => item.href === entry.target.id,
            );
            if (matched) setActive(matched.label);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/blog/")) setActive("Blog");
  }, [location.pathname]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleClick = (item) => {
    setActive(item.label);
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(item.href)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(item.href)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-5">
        <div
          className={`flex items-center gap-1 px-2 py-2 rounded-2xl border transition-all duration-500 w-full sm:w-auto justify-between sm:justify-start ${
            scrolled || mobileOpen
              ? "nav-glass-scrolled"
              : "border-transparent bg-transparent"
          }`}
          style={{
            backdropFilter: scrolled || mobileOpen ? "blur(12px)" : "none",
            WebkitBackdropFilter:
              scrolled || mobileOpen ? "blur(12px)" : "none",
          }}
        >
          {/* Desktop nav items */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map(({ label, href }) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  onClick={() => handleClick({ label, href })}
                  className={`relative px-4 py-1.5 text-sm rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-neutral-800 text-white font-medium"
                      : "text-neutral-400 hover:text-white bg-transparent"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-4 rounded-full bg-white opacity-40" />
                  )}
                </button>
              );
            })}

            {/* Theme Toggle Desktop */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center h-8 w-8 ml-1 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              <div className="transition-transform duration-300 transform hover:rotate-12">
                {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
              </div>
            </button>
          </div>

          {/* Mobile: current label + theme toggle + hamburger */}
          <div className="flex sm:hidden items-center justify-between w-full px-2">
            <span className="text-sm font-medium text-white">{active}</span>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center h-8 w-8 rounded-lg text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Toggle theme"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="flex items-center justify-center h-8 w-8 rounded-lg text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <div
                  style={{
                    transition: "transform 200ms ease, opacity 200ms ease",
                    transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className="fixed top-0 left-0 right-0 z-40 sm:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 250ms ease",
        }}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />

        {/* panel */}
        <div
          className="nav-mobile-panel absolute top-20 left-4 right-4 rounded-2xl border border-neutral-700 bg-zinc-900 overflow-hidden shadow-2xl"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen
              ? "translateY(0) scale(1)"
              : "translateY(-12px) scale(0.97)",
            transition:
              "opacity 250ms cubic-bezier(0.22,1,0.36,1), transform 250ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {navItems.map(({ label, href }, i) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => handleClick({ label, href })}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-left border-b border-neutral-800 last:border-b-0 transition-colors duration-150 ${
                  isActive
                    ? "text-white bg-neutral-800"
                    : "text-neutral-400 hover:text-white bg-transparent"
                }`}
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 300ms ease ${i * 40}ms, transform 300ms ease ${i * 40}ms, background-color 150ms ease`,
                }}
              >
                <span className="text-sm font-medium">{label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
