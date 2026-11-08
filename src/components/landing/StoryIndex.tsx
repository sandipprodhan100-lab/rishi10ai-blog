import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { STORIES } from "@/generated/stories";
import { getStoryCategory, PODCAST, POSTS } from "./landing-content";

const items = [
  ...PODCAST.videos.map((video) => ({
    id: video.id,
    title: video.title,
    author: "",
    category: { label: "Podcast", color: "bg-rose-100 text-rose-800 border-rose-200" },
    image: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
  })),
  {
    id: POSTS[0].slug,
    title: POSTS[0].title,
    author: "Rishi",
    category: { label: "Travel", color: "bg-blue-100 text-blue-800 border-blue-200" },
    image: POSTS[0].image,
  },
  ...STORIES.map((story) => ({
    id: story.slug,
    title: story.title,
    author: story.author,
    category: getStoryCategory(story),
    image: story.images[0],
  })),
  {
    id: "research",
    title: POSTS[1].title,
    author: "",
    category: { label: "Research", color: "bg-amber-100 text-amber-900 border-amber-200" },
    image: POSTS[1].image,
  },
];

const categories = Array.from(new Set(items.map((item) => item.category.label)));

export function StoryIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const search = query.trim().toLocaleLowerCase();
  const visibleItems = items.filter(
    (item) =>
      (category === "All" || item.category.label === category) &&
      [item.title, item.author, item.category.label].some((value) =>
        value.toLocaleLowerCase().includes(search),
      ),
  );

  return (
    <nav id="story-index" aria-labelledby="story-index-title" className="mb-12 scroll-mt-24">
      <div className="rounded-[1.5rem] border border-[#e8ded1] bg-[#fffaf3] p-5 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h3
              id="story-index-title"
              className="font-[Georgia] text-2xl font-bold tracking-[-0.03em] sm:text-3xl"
            >
              Explore the notebook
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#52717a]">
              Find a story, article, poem or something to watch.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="story-search" className="block text-sm font-bold text-[#163b45]">
              Search the notebook
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#52717a]"
              />
              <input
                id="story-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, author or category"
                className="w-full rounded-xl border border-[#d8cabc] bg-white py-2.5 pl-10 pr-3 text-sm text-[#163b45] outline-none focus:border-[#ef6c3b] focus:ring-2 focus:ring-[#ef6c3b]/30"
              />
            </div>
          </div>
        </div>

        <div aria-label="Filter by category" className="mt-6 flex flex-wrap gap-2">
          {["All", ...categories].map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={category === label}
              onClick={() => setCategory(label)}
              className={`rounded-full border px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef6c3b] ${
                category === label
                  ? "border-[#163b45] bg-[#163b45] text-white"
                  : "border-[#d8cabc] bg-white text-[#52717a] hover:border-[#163b45] hover:text-[#163b45]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-5 text-sm font-semibold text-[#52717a]">
          {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
        </p>
        {visibleItems.length === 0 ? (
          <p className="mt-4 rounded-xl border border-[#e8ded1] bg-white p-4 text-sm text-[#52717a]">
            No matches. Try a different search or category.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <li key={item.id} className="min-w-0">
                <a
                  href={`#${item.id}`}
                  className="group flex h-full gap-3 rounded-xl border border-[#e8ded1] bg-white p-3 transition-colors hover:border-[#ef6c3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef6c3b]"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="size-20 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <span className="flex min-w-0 flex-1 flex-col items-start">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.category.color}`}
                    >
                      {item.category.label}
                    </span>
                    <span className="mt-2 font-[Georgia] text-base font-bold leading-snug text-[#163b45] group-hover:text-[#c94f25]">
                      {item.title}
                    </span>
                    {item.author && (
                      <span className="mt-1 text-xs text-[#52717a]">By {item.author}</span>
                    )}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-[#52717a]" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
