import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export const Contact = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const socials = [
    {
      icon: <FaGithub size={15} />,
      label: "GitHub",
      href: "https://github.com/NileshSadhu",
    },
    {
      icon: <FaLinkedin size={15} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nileshsadhu",
    },
    {
      icon: <FaTwitter size={15} />,
      label: "Twitter",
      href: "https://x.com/nileshsadhu640",
    },
    {
      icon: <FaInstagram size={15} />,
      label: "Instagram",
      href: "https://www.instagram.com/x_nilesh_xx/",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex min-h-screen justify-center items-center px-6"
    >
      <div className="text-center max-w-lg w-full">
        <p
          className="text-xs tracking-widest uppercase text-neutral-500 mb-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 700ms ease, transform 700ms ease",
            transitionDelay: "0ms",
          }}
        >
          Get in touch
        </p>

        <h2
          className="text-4xl font-medium text-white mb-6 leading-tight"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 700ms ease, transform 700ms ease",
            transitionDelay: "100ms",
          }}
        >
          Start a conversation.
        </h2>
        <a
          href="mailto:nileshsadhu562@gmail.com"
          className="inline-block text-sm text-neutral-400 border-b border-neutral-700 pb-0.5 mb-10 hover:text-white hover:border-neutral-400 transition-colors duration-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 700ms ease, transform 700ms ease, color 200ms ease, border-color 200ms ease",
            transitionDelay: "200ms",
          }}
        >
          nileshsadhu562@gmail.com
        </a>

        <div
          className="w-10 h-px bg-neutral-700 mx-auto mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 700ms ease, transform 700ms ease",
            transitionDelay: "300ms",
          }}
        />

        <div className="flex gap-2 justify-center flex-wrap">
          {socials.map(({ icon, label, href }, i) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 text-sm text-neutral-400 border border-neutral-700 rounded-xl px-4 py-2 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 700ms ease, transform 700ms ease, background-color 200ms ease, border-color 200ms ease, color 200ms ease",
                transitionDelay: `${400 + i * 75}ms`,
              }}
              target="_blank"
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
