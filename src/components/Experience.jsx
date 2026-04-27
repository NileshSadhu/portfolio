import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Junior Software Developer Intern",
    company: "Custom Technologies Design Lab Pvt. Ltd.",
    period: "April 2024 – September 2024",
    type: "Onsite · Mumbai",
    points: [
      "Identified and resolved 20+ gameplay bugs by collaborating with the development team using issue-tracking tools, improving overall application stability.",
      "Supported VR feature testing and integration, contributing to smoother user interactions and a more polished end-user experience.",
      "Integrated RESTful APIs and managed frontend-to-backend data flow, ensuring reliable communication between application layers.",
      "Utilized Git and GitHub for version control, branch management, issue tracking, and collaborative development workflows.",
    ],
  },
];

export const Experience = () => {
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
      {/* Header */}
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
          Where I've worked
        </p>
        <h2 className="text-4xl font-medium text-white leading-tight">
          Experience.
        </h2>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <div
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.97)",
              transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${150 + i * 100}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${150 + i * 100}ms`,
            }}
            className="flex flex-col gap-5 p-6 rounded-2xl border border-neutral-800 bg-zinc-900 hover:border-neutral-700 transition-colors duration-300"
          >
            {/* Role + period */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-white font-medium text-base">{exp.role}</h3>
                <p className="text-sm text-neutral-400 mt-0.5">{exp.company}</p>
                <p className="text-xs text-neutral-600 mt-1">{exp.type}</p>
              </div>
              <span className="shrink-0 text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 h-fit">
                {exp.period}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-800" />

            {/* Bullet points */}
            <ul className="flex flex-col gap-3">
              {exp.points.map((point, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-sm text-neutral-400 leading-relaxed"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 600ms ease ${300 + j * 75}ms`,
                  }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
