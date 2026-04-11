import { useEffect, useState, useRef } from "react";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiVitest,
  SiRedis,
  SiSocketdotio,
  SiPrisma,
} from "react-icons/si";

const skills = [
  { label: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
  { label: "CSS", icon: <SiCss />, color: "#1572B6" },
  { label: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { label: "React", icon: <FaReact />, color: "#61DAFB" },
  { label: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8" },
  { label: "NextJS", icon: <SiNextdotjs />, color: "#ffffff" },
  { label: "NodeJS", icon: <FaNodeJs />, color: "#68A063" },
  { label: "Express", icon: <SiExpress />, color: "#ffffff" },
  { label: "Prisma", icon: <SiPrisma />, color: "#ffffff" },
  { label: "MongoDB", icon: <SiMongodb />, color: "#4DB33D" },
  { label: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { label: "Vitest", icon: <SiVitest />, color: "#A259FF" },
  { label: "Docker", icon: <FaDocker />, color: "#2496ED" },
  { label: "Redis", icon: <SiRedis />, color: "#FF4438" },
  { label: "Git", icon: <FaGitAlt />, color: "#F05032" },
  { label: "Socket.IO", icon: <SiSocketdotio />, color: "#ffffff" },
];

const Chip = ({ label, icon, color, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 12,
        border: `1px solid ${hovered ? color + "55" : "#3f3f46"}`,
        backgroundColor: hovered ? "#1c1c1e" : "#09090b",
        color: hovered ? "#fff" : "#a1a1aa",
        fontSize: 14,
        fontWeight: 500,
        cursor: "default",
        userSelect: "none",
        boxShadow: hovered ? `0 0 16px 2px ${color}25` : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.92)",
        transition: [
          `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 45}ms`,
          `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 45}ms`,
          "border-color 200ms ease",
          "box-shadow 200ms ease",
          "color 200ms ease",
          "background-color 200ms ease",
        ].join(", "),
      }}
    >
      <span
        style={{
          color,
          fontSize: 15,
          lineHeight: 1,
          display: "flex",
          transform: hovered
            ? "rotate(12deg) scale(1.25)"
            : "rotate(0deg) scale(1)",
          filter: hovered ? `drop-shadow(0 0 5px ${color}bb)` : "none",
          transition:
            "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 200ms ease",
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
};

export const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => setVisible(true), 200);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen px-6 gap-12"
    >
      {/* Header */}
      <div
        className="text-center"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p className="text-xs tracking-widest uppercase text-neutral-500 mb-3">
          What I work with
        </p>
        <h2 className="text-4xl font-medium text-white leading-tight">
          Skills & tools.
        </h2>
      </div>

      {/* Chips — flat list, wraps naturally */}
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
        {skills.map((skill, i) => (
          <Chip key={skill.label} {...skill} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};
