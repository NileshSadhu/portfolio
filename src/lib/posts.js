const modules = import.meta.glob("../content/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
});

console.log("glob keys:", Object.keys(modules));
console.log("modules:", modules);

const parseFrontmatter = (raw) => {
    const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

    const match = normalized.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
        console.log("NO MATCH — first 100 chars:", JSON.stringify(normalized.slice(0, 100)));
        return { data: {}, content: normalized };
    }

    const frontmatter = match[1];
    const content = normalized.slice(match[0].length).trim();

    const data = {};
    frontmatter.split("\n").forEach((line) => {
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) return;

        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();

        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        if (value.startsWith("[") && value.endsWith("]")) {
            value = value
                .slice(1, -1)
                .split(",")
                .map((v) => v.trim().replace(/^["']|["']$/g, ""));
        }

        data[key] = value;
    });

    return { data, content };
};

export const getAllPosts = () => {
    return Object.entries(modules)
        .map(([filepath, raw]) => {
            const slug = filepath.replace("../content/", "").replace(".md", "");
            const { data, content } = parseFrontmatter(raw);

            return {
                slug,
                title: data.title || "",
                date: data.date || "",
                readTime: data.readTime || "",
                excerpt: data.excerpt || "",
                tags: Array.isArray(data.tags) ? data.tags : [],
                content,
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug) => {
    return getAllPosts().find((p) => p.slug === slug) || null;
};