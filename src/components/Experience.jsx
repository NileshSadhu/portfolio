import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Junior Software Developer Intern",
    company: "Custom Technologies Design Lab Pvt. Ltd.",
    period: "Apr 2024 – Sep 2024",
    type: "Onsite · Mumbai",
    points: [
      "Squashed 20+ gameplay bugs working closely with the dev team, making the app noticeably more stable.",
      "Helped test and ship VR features for a smoother end-user experience.",
      "Connected frontend to backend through RESTful APIs for reliable data flow.",
      "Used Git/GitHub daily for version control and team collaboration.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Axentra OS (Altiss Advance) Pvt. Ltd.",
    period: "2024 – 2025",
    type: "Onsite · Mumbai",
    points: [
      "Built 25 reusable React + TypeScript components and a 12-page merchant dashboard powered by 22 APIs.",
      "Integrated 9 Ekart Logistics APIs — tracking, shipping costs, returns, and webhooks — with fallback handling for edge cases.",
      "Shipped a Shopify Theme App Extension for custom navbar icons, with Shadow DOM and multi-theme support.",
      "Designed a 7-section Membership & Rewards portal with 4 API integrations.",
      "Automated cart-abandonment and wishlist emails for Shopify stores using Django.",
    ],
  },
];

const TimelineCard = ({ exp, index, visible, isLeft }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative grid sm:grid-cols-2 gap-6 sm:gap-10">
      {/* Dot */}
      <div
        className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(-50%) scale(1)"
            : "translateX(-50%) scale(0)",
          transition: `opacity 400ms ease ${200 + index * 150}ms, transform 400ms cubic-bezier(0.34,1.56,0.64,1) ${200 + index * 150}ms`,
        }}
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          {/* pulse ring */}
          <span
            className="absolute h-3 w-3 rounded-full bg-neutral-500"
            style={{
              animation: visible
                ? "pulseRing 2.4s cubic-bezier(0.22,1,0.36,1) infinite"
                : "none",
              animationDelay: `${1000 + index * 300}ms`,
            }}
          />
          <span
            className="relative block h-3 w-3 rounded-full bg-zinc-950 border-2 transition-colors duration-300"
            style={{ borderColor: hovered ? "#a1a1aa" : "#737373" }}
          />
        </span>
      </div>

      {/* Card */}
      <div
        className={`pl-10 sm:pl-0 ${isLeft ? "sm:col-start-1" : "sm:col-start-2"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${250 + index * 150}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${250 + index * 150}ms`,
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col gap-3 p-4 rounded-2xl border bg-zinc-900 transition-all duration-300 ${isLeft ? "sm:text-right" : ""}`}
          style={{
            borderColor: hovered ? "#52525b" : "#27272a",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovered ? "0 8px 24px -8px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <span
            className="text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1 w-fit sm:ml-auto transition-colors duration-300"
            style={{ color: hovered ? "#d4d4d8" : "#a1a1aa" }}
          >
            {exp.period}
          </span>

          <div>
            <h3 className="text-white font-medium text-sm">{exp.role}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">{exp.company}</p>
            <p className="text-xs text-neutral-600 mt-0.5">{exp.type}</p>
          </div>

          <div className="h-px bg-neutral-800" />

          <ul className={`flex flex-col gap-2 ${isLeft ? "sm:items-end" : ""}`}>
            {exp.points.map((point, j) => (
              <li
                key={j}
                className={`flex gap-2 text-xs text-neutral-400 leading-relaxed text-left ${isLeft ? "sm:flex-row-reverse" : ""}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateX(0)"
                    : isLeft
                      ? "translateX(8px)"
                      : "translateX(-8px)",
                  transition: `opacity 400ms ease ${400 + index * 150 + j * 60}ms, transform 400ms ease ${400 + index * 150 + j * 60}ms`,
                }}
              >
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`hidden sm:block ${isLeft ? "sm:col-start-2" : "sm:col-start-1 sm:row-start-1"}`}
      />
    </div>
  );
};

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
      className="flex flex-col items-center justify-center min-h-screen px-6 py-24 gap-16"
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
          Where I've worked
        </p>
        <h2 className="text-4xl font-medium text-white leading-tight">
          Experience.
        </h2>
      </div>

      <div className="relative w-full max-w-2xl">
        <div
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-neutral-800 sm:-translate-x-1/2"
          style={{
            transform: visible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, i) => (
            <TimelineCard
              key={i}
              exp={exp}
              index={i}
              visible={visible}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
};
