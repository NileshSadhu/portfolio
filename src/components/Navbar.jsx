import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "home" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Blog", href: "blog" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (item) => {
    setActive(item.label);
    if (location.pathname !== "/") {
      // navigate home first, then scroll to section
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5">
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-2xl border transition-all duration-500"
        style={{
          borderColor: scrolled ? "#3f3f46" : "transparent",
          backgroundColor: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(255,255,255,0.04) inset"
            : "none",
        }}
      >
        {navItems.map(({ label, href }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleClick({ label, href })}
              className="relative px-4 py-1.5 text-sm rounded-xl transition-colors duration-200"
              style={{
                color: isActive ? "#ffffff" : "#71717a",
                backgroundColor: isActive ? "#27272a" : "transparent",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-4 rounded-full bg-white opacity-40" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
