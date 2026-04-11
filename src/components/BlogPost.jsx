import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { posts } from "../components/Blog";

const content = {
  "why-i-love-typescript": `
TypeScript is a superset of JavaScript that adds static typing. At first it feels like friction — you're writing more, the compiler yells at you, and simple scripts feel bloated.

Then something clicks.

You stop chasing bugs that "shouldn't exist." Your editor knows what shape your data is. Refactoring a function signature ripples correctly across your entire codebase instead of silently breaking things.

## The real benefit isn't catching bugs

It's the **confidence to move fast**. When TypeScript says your code is correct, you trust it. You ship faster because you're not mentally tracking every possible shape a variable could be.

## Start small

You don't need to rewrite everything. Add \`tsconfig.json\`, rename one file to \`.ts\`, and go from there. The types you write today are documentation that never goes stale.

TypeScript isn't perfect. The learning curve is real. But the investment pays back in every project you ship after.
  `,
  "building-with-nextjs": `
NextJS started as a simple server-side rendering wrapper around React. Today it's a full-stack framework with its own opinions about routing, data fetching, caching, and deployment.

## File-based routing

Drop a file in \`/app\` and it's a route. Nested folders become nested layouts. It sounds simple but the implications are profound — your folder structure *is* your architecture.

## Server Components

The mental model shift: components render on the server by default. You fetch data directly in the component, no useEffect, no loading state boilerplate. Client components opt-in with \`"use client"\`.

## What I actually use it for

- Marketing sites that need SEO
- Dashboards with mixed static and dynamic data
- APIs co-located with the frontend

NextJS isn't always the right tool. For highly interactive SPAs it can feel like overhead. But for most production web apps, it's the best starting point I've found.
  `,
  "docker-for-developers": `
I resisted Docker for a long time. It felt like something ops teams dealt with, not developers. Then I spent two hours debugging a bug that only existed on my colleague's machine.

That was the last time.

## What Docker actually does

It packages your app and its environment together. Node 18, specific npm packages, environment variables — all frozen in a reproducible snapshot called an image.

## My minimal setup

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

That's it for most projects. Build the image, run the container, share the image.

## docker-compose for local dev

The real unlock is \`docker-compose\`. Define your app, database, and Redis in one file. \`docker-compose up\` and your entire stack is running in seconds. No installation guides, no version conflicts.

You don't need to understand Kubernetes to benefit from Docker. Start with one Dockerfile and go from there.
  `,
};

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!post)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500 text-sm">Post not found.</p>
      </div>
    );

  const body = content[slug] || "";

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
          {body
            .trim()
            .split("\n\n")
            .map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-lg font-medium text-white mt-8 mb-3"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("```")) {
                const code = block
                  .replace(/```[a-z]*\n?/, "")
                  .replace(/```$/, "");
                return (
                  <pre
                    key={i}
                    className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-xs text-neutral-300 overflow-x-auto my-4 font-mono"
                  >
                    {code}
                  </pre>
                );
              }
              return (
                <p
                  key={i}
                  className="text-neutral-400 text-sm leading-relaxed mb-4"
                >
                  {block.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              );
            })}
        </div>
      </article>
    </div>
  );
};
