import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export const posts = [
  {
    slug: "why-i-love-typescript",
    title: "Why I love TypeScript",
    date: "Mar 28, 2025",
    readTime: "4 min read",
    excerpt:
      "TypeScript changed how I think about code. Here's why every JavaScript developer should give it a serious shot.",
    tags: ["TypeScript", "JavaScript"],
  },
];

const PostCard = ({ post, index, visible }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/blog/${post.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.97)",
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${150 + index * 100}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${150 + index * 100}ms`,
        cursor: "pointer",
      }}
      className="group flex flex-col gap-3 p-5 rounded-2xl border border-neutral-800 bg-zinc-900 hover:border-neutral-600 transition-colors duration-300"
    >
      <div className="flex items-center gap-3 text-xs text-neutral-600">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>

      <div>
        <h3
          className="text-white font-medium text-base mb-2 transition-colors duration-200"
          style={{ color: hovered ? "#fff" : "#e4e4e7" }}
        >
          {post.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-800">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <FiArrowRight
          size={14}
          className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export const Blog = () => {
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
          Thoughts & writing
        </p>
        <h2 className="text-4xl font-medium text-white leading-tight">Blog.</h2>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};
