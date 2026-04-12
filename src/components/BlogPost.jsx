import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getPostBySlug } from "../lib/posts";
import ReactMarkdown from "react-markdown";

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  if (!post)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500 text-sm">Post not found.</p>
      </div>
    );

  const fadeUp = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <div className="min-h-screen px-6 py-24 flex flex-col items-center">
      <article className="w-full max-w-2xl flex flex-col gap-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors duration-200 w-fit"
          style={fadeUp(0)}
        >
          <FiArrowLeft size={14} /> Back
        </button>

        {/* Meta */}
        <div style={fadeUp(80)}>
          <div className="flex items-center gap-3 text-xs text-neutral-600 mb-4">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-medium text-white leading-snug mb-4">
            {post.title}
          </h1>
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
        </div>

        {/* Divider */}
        <div
          className="h-px bg-neutral-800"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition:
              "opacity 600ms ease 200ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 200ms",
          }}
        />

        {/* Body */}
        <div style={fadeUp(250)}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-medium text-white mt-10 mb-4 leading-snug"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-lg font-medium text-white mt-8 mb-3"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-base font-medium text-neutral-200 mt-6 mb-2"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-neutral-400 text-sm leading-relaxed mb-4"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors duration-200"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="text-neutral-200 font-medium" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="text-neutral-300 italic" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="flex flex-col gap-1.5 mb-4 ml-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="flex flex-col gap-1.5 mb-4 ml-4 list-decimal"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-neutral-400 text-sm leading-relaxed list-disc"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-2 border-neutral-700 pl-4 my-4 text-neutral-500 text-sm italic"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="text-neutral-300 bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 text-xs font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="block bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-xs text-neutral-300 overflow-x-auto my-4 font-mono whitespace-pre"
                    {...props}
                  />
                ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 overflow-x-auto my-4"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  className="w-full rounded-2xl my-6 object-cover border border-neutral-800"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr
                  className="border-none h-px bg-neutral-800 my-8"
                  {...props}
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};
