import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Software Developer",
    company: "SAAR IT",
    period: "Jul 2026 – Present",
    type: "Onsite · Mumbai",
    accent: "#8b5cf6",
    points: [
      "Architected SAAR One, an end-to-end HRMS for 300+ employees across 11 departments, delivering 14+ modules including attendance, payroll, recruitment, employee records, leave, approvals, notifications, and reporting.",
      "Contributed to Treelogy, a BMC tree-survey system managing 1,000+ tree records, with geolocation-based data capture, tree photo upload, species identification, and multi-level approvals that digitized field verification.",
      "Built Kora Dial, a multi-tenant cloud call-center dialer on FreeSWITCH, with 3 user roles (Super Admin, Admin, Agent) and a separate database schema per project for tenant-level data isolation.",
      "Implemented role-based access control, modular architecture, and schema management across 4 enterprise applications (Maha-HRMS, SAAR One, Treelogy, Kora Dial), improving maintainability and scalability.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Axentra OS (Altiss Advance) Pvt. Ltd.",
    period: "Mar 2026 – Jun 2026",
    type: "Onsite · Mumbai",
    accent: "#22c55e",
    points: [
      "Engineered 25 reusable React.js and TypeScript components and a 12-page merchant dashboard integrating 22 APIs for a Warranty Management platform, with analytics on performance, profitability, claims, and operations.",
      "Integrated 9 Ekart Logistics APIs covering order creation, shipment tracking, shipping cost, serviceability, reverse and exchange orders, and webhook-driven status updates, with fallback handling and testing alongside the Ekart team.",
      "Shipped a Shopify Theme App Extension for navbar customization, with SVG replacement, Shadow DOM, and multi-theme support.",
      "Launched a Membership & Rewards portal with 7 responsive sections and 4 API integrations, plus Django-based cart abandonment and wishlist email automation.",
    ],
  },
  {
    role: "Junior Software Developer Intern",
    company: "Custom Technologies Design Lab Pvt. Ltd.",
    period: "Apr 2024 – Jun 2024",
    type: "Onsite · Mumbai",
    accent: "#f59e0b",
    points: [
      "Fixed 20+ gameplay bugs in a VR application over 3 months, tracked through the team’s issue tracker.",
      "Tested multiple VR features and supported their integration into the application.",
      "Managed Git branches and merges with a team of developers.",
      "Connected the frontend to REST endpoints, managing data flow between application layers.",
    ],
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ExperienceCard = ({ exp, index, scrollProgress, visible }) => {
  const stage = scrollProgress * (experiences.length - 1);
  const activeIndex = Math.min(Math.floor(stage), experiences.length - 1);
  const transitionProgress = stage - activeIndex;
  const isIncoming = index > activeIndex;
  const isActive = index === activeIndex;
  const distanceFromActive = index - activeIndex;
  const cardY = isIncoming
    ? `calc(${(distanceFromActive - transitionProgress) * 100}% + ${(distanceFromActive - 1) * 14}px)`
    : isActive
      ? `${-transitionProgress * 14}px`
      : `${-(activeIndex - index) * 14 - transitionProgress * 14}px`;
  const cardZ = isIncoming
    ? -120 * (1 - transitionProgress)
    : isActive
      ? -24 * transitionProgress
      : -(activeIndex - index) * 28;
  const rotateX = isIncoming ? 8 * (1 - transitionProgress) : 0;
  const scale = isIncoming
    ? 1 - (distanceFromActive - 1) * 0.025 - (1 - transitionProgress) * 0.035
    : 1 - (activeIndex - index) * 0.025 - (isActive ? transitionProgress * 0.025 : 0);

  return (
    <article
      className="experience-stack-card absolute inset-x-0 overflow-hidden rounded-[30px] border p-5 backdrop-blur-sm sm:p-7"
      style={{
        top: 0,
        transform: `perspective(1200px) translate3d(0, ${cardY}, ${cardZ}px) rotateX(${rotateX}deg) scale(${scale})`,
        opacity: visible ? 1 : 0,
        zIndex: isIncoming
          ? experiences.length + activeIndex + 1 - (index - activeIndex - 1) * 2
          : experiences.length - (activeIndex - index),
        background: `linear-gradient(135deg, ${exp.accent}14 0%, rgba(24, 24, 27, 0.97) 38%, rgba(9, 9, 11, 0.99) 100%)`,
        boxShadow: `0 30px 80px -30px ${exp.accent}55`,
        borderColor: `${exp.accent}66`,
      }}
    >
      <div className="experience-card-glow absolute inset-0 opacity-80" aria-hidden="true">
        <div
          className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl"
          style={{ backgroundColor: `${exp.accent}40` }}
        />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.24em]"
            style={{
              borderColor: `${exp.accent}80`,
              backgroundColor: `${exp.accent}1a`,
              color: exp.accent,
            }}
          >
            {exp.period}
          </span>
          <span className="experience-meta text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {exp.type}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="experience-role text-2xl font-medium text-white">{exp.role}</h3>
            <p className="experience-company mt-2 text-sm text-zinc-400">{exp.company}</p>
          </div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
            style={{ backgroundColor: `${exp.accent}20`, boxShadow: `0 0 30px -12px ${exp.accent}` }}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: exp.accent }} />
          </span>
        </div>

        <div
          className="mt-6 h-px w-full"
          style={{ background: `linear-gradient(90deg, ${exp.accent} 0%, rgba(255,255,255,0.22) 55%, transparent 100%)` }}
        />

        <ul className="experience-points mt-6 space-y-3 text-sm leading-relaxed text-zinc-300">
          {exp.points.map((point, j) => (
            <li key={j} className="flex gap-3">
              <span
                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: exp.accent }}
              />
              <span className="experience-point">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export const Experience = () => {
  const [visible, setVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp((-rect.top) / totalScrollable, 0, 1);
      setScrollProgress(progress);
      setVisible(rect.top < window.innerHeight && rect.bottom > 0);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="experience-section relative"
      style={{ minHeight: `${100 + (experiences.length - 1) * 70}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-[80%]">
          <div
            className="mb-12 text-center"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 700ms ease, transform 700ms ease",
            }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500">
              Where I&apos;ve worked
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Experience.
            </h2>
          </div>

          <div className="relative h-[min(68vh,620px)] min-h-[500px] sm:min-h-[560px]">
            <div className="relative mx-auto h-full w-full">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  exp={exp}
                  index={index}
                  scrollProgress={scrollProgress}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
