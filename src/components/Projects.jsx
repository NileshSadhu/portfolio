import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio built with React, Tailwind CSS and Vite. Features smooth animations, command menu, and a Pikachu cursor easter egg.",
    tags: ["React", "Tailwind", "Vite"],
    github: "https://github.com/NileshSadhu/Portfolio",
    live: "https://nileshsadhu.com",
    featured: true,
  },
  {
    title: "Peeltalk",
    description:
      "Real-time chat application with Socket.IO, JWT auth, and MongoDB. Supports rooms, typing indicators. Its  let you connect with rbdom people around the globe.",
    tags: ["React", "tailwind", "NodeJS", "Express", "Socket.IO", "MongoDB"],
    github: "https://github.com/NileshSadhu/PeelTalk",
    live: "https://www.peeltalk.live",
    featured: true,
  },
];

const ProjectCard = ({ project, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.97)",
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${150 + index * 100}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${150 + index * 100}ms`,
      }}
      className="relative flex flex-col gap-4 p-5 rounded-2xl border border-neutral-800 bg-zinc-900 hover:border-neutral-600 transition-colors duration-300"
    >
      {project.featured && (
        <span className="absolute top-4 right-4 text-xs text-yellow-500/70 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-2.5 py-0.5">
          Featured
        </span>
      )}

      <div>
        <h3 className="text-white font-medium text-base mb-2">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="flex items-center gap-3 pt-3 border-t border-neutral-800"
        style={{
          borderColor: hovered ? "#3f3f46" : "#27272a",
          transition: "border-color 300ms ease",
        }}
      >
        <a
          href={project.github}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors duration-200"
        >
          <FiGithub size={13} /> Source
        </a>
        <a
          href={project.live}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors duration-200"
        >
          <FiExternalLink size={13} /> Live
        </a>
      </div>
    </div>
  );
};

export const Projects = () => {
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
      className="flex flex-col items-center justify-center min-h-screen px-6 py-24 gap-12"
    >
      <div
        className="text-center"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="text-xs tracking-widest uppercase text-neutral-500 mb-3">
          What I've built
        </p>
        <h2 className="text-4xl font-medium text-white leading-tight">
          Projects.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
};
