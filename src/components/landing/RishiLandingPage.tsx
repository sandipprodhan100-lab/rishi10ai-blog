import { useEffect, useState, useMemo } from "react";
import { Plane, Sparkles, BookOpen, Feather, Smartphone, AlertTriangle, CheckCircle2, ShieldAlert, HeartHandshake } from "lucide-react";
import { STORIES, Story } from "@/generated/stories";

const POSTS = [
  {
    id: "london",
    slug: "london-post",
    tag: "Rishi Blogpost",
    title: "My London Journey",
    date: "A London notebook",
    type: "Travel",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    body: "London felt like a storybook that someone had left open. I saw red buses, old buildings, the River Thames and so many people going somewhere interesting. My favourite part was looking up and noticing that every street seemed to have a different shape.",
    note: "I want to come back when I am older and visit more museums, parks and football grounds.",
  },
  {
    id: "airports",
    tag: "Rishi Research",
    title: "Airports Around the World",
    date: "A first research note",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
    body: "Airports are like small cities where journeys begin. Some are famous for being enormous, some for their beautiful buildings, and some for helping people reach places that would otherwise feel very far away.",
    note: "My question: which airport has the best design, the busiest runways and the most surprising destination?",
  },
] as const;

function getStoryCategory(story: Story): { label: string; color: string } {
  if (
    story.slug === "the-refrigerator-hates-me" ||
    story.slug === "when-the-clock-strikes-twelve"
  ) {
    return { label: "Poetry", color: "bg-purple-100 text-purple-800 border-purple-200" };
  }
  if (story.slug === "the-smart-home-that-locked-the-doors-and-welcomed-something-else-inside") {
    return { label: "Horror", color: "bg-rose-100 text-rose-800 border-rose-200" };
  }
  if (story.slug === "advantages-and-disadvantages-of-mobile-phones") {
    return { label: "Essay", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  }
  if (
    story.slug === "the-clever-crow" ||
    story.slug === "the-gold-giving-serpent" ||
    story.slug === "the-monkey-and-the-crocodile"
  ) {
    return { label: "Fable", color: "bg-amber-100 text-amber-800 border-amber-200" };
  }
  return { label: "Fiction", color: "bg-sky-100 text-sky-800 border-sky-200" };
}

function RishiMark() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-2xl bg-[#ef6c3b] text-white shadow-[0_8px_24px_rgba(239,108,59,0.22)]">
        <Sparkles className="size-5" strokeWidth={2.2} />
      </span>
      <span className="font-[Georgia] text-xl font-bold tracking-[-0.03em] text-[#163b45]">
        Rishi <span className="text-[#ef6c3b]">notes</span>
      </span>
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ef6c3b]">{children}</p>
  );
}

/**
 * Enhanced blog-friendly paragraph renderer
 */
function StructuredStoryBody({ story }: { story: Story }) {
  const isMobileEssay = story.slug === "advantages-and-disadvantages-of-mobile-phones";
  const isSmartHome = story.slug === "the-smart-home-that-locked-the-doors-and-welcomed-something-else-inside";

  if (isMobileEssay) {
    const rawParagraphs = story.body.split(/\n\n+/);
    return (
      <div className="mx-auto max-w-3xl px-7 pb-10 sm:px-12">
        {rawParagraphs.map((paragraph, index) => {
          const trimmed = paragraph.trim();

          // Section headers
          if (trimmed === "ADVANTAGES OF MOBILE PHONES") {
            return (
              <div key={index} className="mt-10 mb-6 flex items-center gap-3 border-b-2 border-emerald-400/60 pb-3">
                <span className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="size-5" />
                </span>
                <h4 className="font-[Georgia] text-2xl font-bold text-emerald-950 tracking-tight">
                  Advantages of Mobile Phones
                </h4>
              </div>
            );
          }

          if (trimmed === "DISADVANTAGES OF MOBILE PHONES") {
            return (
              <div key={index} className="mt-12 mb-6 flex items-center gap-3 border-b-2 border-rose-400/60 pb-3">
                <span className="grid size-9 place-items-center rounded-xl bg-rose-100 text-rose-700">
                  <AlertTriangle className="size-5" />
                </span>
                <h4 className="font-[Georgia] text-2xl font-bold text-rose-950 tracking-tight">
                  Disadvantages of Mobile Phones
                </h4>
              </div>
            );
          }

          if (trimmed === "CONCLUSION") {
            return (
              <div key={index} className="mt-12 mb-6 flex items-center gap-3 border-b-2 border-[#163b45]/30 pb-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#163b45]/10 text-[#163b45]">
                  <HeartHandshake className="size-5" />
                </span>
                <h4 className="font-[Georgia] text-2xl font-bold text-[#163b45] tracking-tight">
                  Conclusion & Looking Ahead
                </h4>
              </div>
            );
          }

          // Numbered Advantage sub-sections
          if (/^[1-3]\.\s/.test(trimmed)) {
            const lines = trimmed.split("\n");
            const heading = lines[0];
            const content = lines.slice(1).join("\n");
            const isFirstAdvantage = heading.startsWith("1.");
            const isSecondAdvantage = heading.startsWith("2.");

            return (
              <div key={index} className="my-6">
                <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6">
                  <h5 className="font-[Georgia] text-xl font-bold text-emerald-900 mb-3">
                    {heading}
                  </h5>
                  <p className="font-[Georgia] text-[1.05rem] leading-8 text-[#415e66]">
                    {content}
                  </p>
                </div>
                {/* Image 1: Global Connectivity */}
                {isFirstAdvantage && story.images[0] && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                    <img
                      src={story.images[0]}
                      alt="Universal connectivity and communication"
                      className="h-72 w-full object-cover sm:h-96"
                    />
                    <div className="bg-[#fcfaf7] px-4 py-2.5 text-xs font-semibold text-[#6d8a92] border-t border-[#e8ded1]">
                      Connected generation: Instant global communication and learning in the palm of our hand
                    </div>
                  </div>
                )}
                {/* Image 2: Accelerated Learning */}
                {isSecondAdvantage && story.images[1] && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                    <img
                      src={story.images[1]}
                      alt="Democratization of information and learning"
                      className="h-72 w-full object-cover sm:h-96"
                    />
                    <div className="bg-[#fcfaf7] px-4 py-2.5 text-xs font-semibold text-[#6d8a92] border-t border-[#e8ded1]">
                      Accelerated learning: Accessing world knowledge and interactive studies anytime
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Bullet point lists under Disadvantages
          if (trimmed.includes("•")) {
            const lines = trimmed.split("\n");
            const heading = lines[0];
            const bulletItems = lines.slice(1);
            const isFirstDisadvantage = heading.startsWith("1.");

            return (
              <div key={index} className="my-6">
                <div className="rounded-2xl border border-rose-200/80 bg-rose-50/30 p-6">
                  <h5 className="font-[Georgia] text-xl font-bold text-rose-950 mb-4">
                    {heading}
                  </h5>
                  <ul className="space-y-4">
                    {bulletItems.map((item, bIndex) => {
                      const cleanItem = item.replace(/^•\s*/, "").trim();
                      const colonIndex = cleanItem.indexOf(":");
                      const title = colonIndex !== -1 ? cleanItem.substring(0, colonIndex) : "";
                      const desc = colonIndex !== -1 ? cleanItem.substring(colonIndex + 1) : cleanItem;

                      return (
                        <li key={bIndex} className="flex items-start gap-3">
                          <span className="mt-2 size-2 shrink-0 rounded-full bg-rose-500" />
                          <p className="font-[Georgia] text-[1.02rem] leading-7 text-[#415e66]">
                            {title ? <strong className="text-[#163b45] font-bold">{title}:</strong> : null}
                            {desc}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* Image 3: Digital fatigue */}
                {isFirstDisadvantage && story.images[2] && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                    <img
                      src={story.images[2]}
                      alt="Digital eye strain and screen fatigue"
                      className="h-72 w-full object-cover sm:h-96"
                    />
                    <div className="bg-[#fcfaf7] px-4 py-2.5 text-xs font-semibold text-[#6d8a92] border-t border-[#e8ded1]">
                      The cost of constant connection: Late night blue light exposure and screen fatigue
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Normal paragraph
          return (
            <div key={index} className="my-4">
              <p className="font-[Georgia] text-[1.05rem] leading-8 text-[#52717a]">
                {trimmed}
              </p>
              {index === 0 && story.images[3] && (
                <div className="my-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                  <img
                    src={story.images[3]}
                    alt="Mobile phones connecting everyday life"
                    className="h-72 w-full object-cover sm:h-96"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Standard story layout (Smart home & other narratives)
  const paragraphs = story.body.split(/\n\n+/);
  return (
    <div className="mx-auto max-w-3xl px-7 pb-10 sm:px-12">
      {paragraphs.map((paragraph, index, arr) => {
        const isDialogue = paragraph.startsWith('"') || paragraph.includes(' whispered:');
        const isSystemDialogue = isSmartHome && (paragraph.includes('"Welcome home,"') || paragraph.includes('"Error,"') || paragraph.includes('Analysis:'));

        // Determine image placement
        let imageToRender: string | null = null;
        if (isSmartHome) {
          if (index === 0 && story.images[0]) imageToRender = story.images[0];
          else if (index === 4 && story.images[1]) imageToRender = story.images[1];
          else if (index === 11 && story.images[2]) imageToRender = story.images[2];
        } else {
          // General story image spacing
          if (story.images.length === 1 && index === Math.floor(arr.length / 2)) {
            imageToRender = story.images[0];
          } else if (story.images.length === 2) {
            if (index === 1) imageToRender = story.images[0];
            else if (index === arr.length - 2) imageToRender = story.images[1];
          } else if (story.images.length >= 3) {
            if (index === 0) imageToRender = story.images[0];
            else if (index === Math.floor(arr.length / 2)) imageToRender = story.images[1];
            else if (index === arr.length - 2) imageToRender = story.images[2];
          }
        }

        return (
          <div key={`${story.slug}-${index}`} className="my-4">
            <p
              className={`font-[Georgia] text-[1.05rem] leading-8 text-[#52717a] ${
                isSystemDialogue
                  ? "my-3 rounded-xl border-l-4 border-rose-500 bg-rose-50/50 p-4 font-mono text-sm tracking-wide text-rose-900"
                  : isDialogue
                  ? "italic text-[#284952]"
                  : ""
              }`}
            >
              {paragraph}
            </p>

            {imageToRender && (
              <div className="my-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md transition-shadow hover:shadow-lg">
                <img
                  src={imageToRender}
                  alt={`${story.title} illustration`}
                  className="h-64 w-full object-cover sm:h-96 transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function RishiLandingPage() {
  const [dreams, setDreams] = useState("");
  const [activeSlug, setActiveSlug] = useState<string>("london-post");

  useEffect(() => {
    setDreams(window.localStorage.getItem("rishi-dreams") ?? "");
  }, []);

  // IntersectionObserver to dynamically track which story is currently in focus
  useEffect(() => {
    const allSlugs = ["london-post", ...STORIES.map((s) => s.slug)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    allSlugs.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function updateDreams(value: string) {
    setDreams(value);
    window.localStorage.setItem("rishi-dreams", value);
  }

  const allStoryItems = useMemo(() => {
    return [
      {
        id: "london-post",
        title: "My London Journey",
        author: "Rishi",
        category: { label: "Travel", color: "bg-blue-100 text-blue-800 border-blue-200" },
      },
      ...STORIES.map((s) => ({
        id: s.slug,
        title: s.title,
        author: s.author,
        category: getStoryCategory(s),
      })),
    ];
  }, []);

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#163b45]">
      <header className="sticky top-0 z-30 border-b border-[#e8ded1]/80 bg-[#fffaf3]/90 px-5 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <RishiMark />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#52717a] md:flex">
            <a href="#blog" className="transition-colors hover:text-[#ef6c3b]">Blogpost</a>
            <a href="#research" className="transition-colors hover:text-[#ef6c3b]">Research</a>
          </nav>
          <a
            href="#dreams"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#163b45] px-4 py-2 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            See my dreams
          </a>
        </div>
      </header>

      <main>
        <section className="relative px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <div className="pointer-events-none absolute -right-28 top-6 size-80 rounded-full bg-[#f7c96d]/30 blur-3xl" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8ded1] bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#52717a]">
                <span className="size-2 rounded-full bg-[#79b95c]" /> A curious corner of the internet
              </p>
              <h1 className="max-w-3xl font-[Georgia] text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#163b45] sm:text-7xl">
                Big questions. <span className="text-[#ef6c3b]">Small notebook.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#52717a] sm:text-xl">
                I am Rishi. This is where I write about places I visit, things I research and dreams
                I am still learning how to build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#blog"
                  className="rounded-full bg-[#ef6c3b] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(239,108,59,0.2)] transition-transform hover:-translate-y-0.5"
                >
                  Read the posts
                </a>
                <a
                  href="#dreams"
                  className="rounded-full border border-[#d8cabc] bg-white px-5 py-3 text-sm font-bold text-[#163b45] transition-transform hover:-translate-y-0.5"
                >
                  See my dreams
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md rotate-2 rounded-[2rem] border-[10px] border-white bg-[#d9eef0] p-3 shadow-[0_24px_70px_rgba(22,59,69,0.14)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#a9d4d6]">
                <img
                  src="/rishi/notebook.jpg"
                  alt="Rishi and friends looking out across a mountain lake"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute -bottom-4 -left-5 rotate-[-8deg] rounded-xl bg-[#f7c96d] px-4 py-2 font-[Georgia] text-sm font-bold text-[#163b45] shadow-md">
                keep wondering
              </span>
            </div>
          </div>
        </section>

        <section id="blog" className="border-y border-[#e8ded1] bg-white px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>01 / Rishi Blogpost</SectionLabel>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <h2 className="max-w-2xl font-[Georgia] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                Stories from the road, told in my own words.
              </h2>
              <p className="max-w-xs text-sm leading-6 text-[#52717a]">
                A ten-year-old view of places that feel much bigger than a map.
              </p>
            </div>

            {/* Mobile / Tablet Horizontal Story Bar */}
            <div className="mb-8 flex overflow-x-auto pb-3 gap-2 lg:hidden no-scrollbar">
              {allStoryItems.map((item, idx) => {
                const isActive = activeSlug === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#ef6c3b] text-white shadow-md shadow-[#ef6c3b]/20"
                        : "bg-[#fffaf3] text-[#52717a] border border-[#e8ded1] hover:bg-white hover:text-[#163b45]"
                    }`}
                  >
                    <span className="mr-1.5 opacity-70">0{idx + 1}.</span>
                    {item.title}
                  </a>
                );
              })}
            </div>

            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 items-start">
              {/* Desktop Sticky Floating Distinguishable Story Index */}
              <nav className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-[#e8ded1] bg-[#fffaf3]/95 p-4 shadow-sm backdrop-blur-md max-h-[calc(100vh-7rem)] overflow-y-auto">
                  <div className="mb-3 flex items-center justify-between border-b border-[#e8ded1]/80 pb-2.5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ef6c3b]">
                      Story Index
                    </p>
                    <span className="text-[11px] font-bold text-[#8b9da0]">
                      {allStoryItems.length} Entries
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {allStoryItems.map((item, idx) => {
                      const isActive = activeSlug === item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all ${
                              isActive
                                ? "bg-white border-l-4 border-l-[#ef6c3b] border-y border-r border-[#e8ded1] shadow-sm text-[#163b45] font-bold"
                                : "text-[#52717a] hover:bg-white/70 hover:text-[#163b45] border border-transparent"
                            }`}
                          >
                            <span
                              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[10px] font-bold font-mono transition-colors ${
                                isActive
                                  ? "bg-[#ef6c3b] text-white"
                                  : "bg-[#e8ded1]/60 text-[#6d8a92] group-hover:bg-[#ef6c3b]/15 group-hover:text-[#ef6c3b]"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 justify-between">
                                <span className="line-clamp-2 text-xs font-semibold leading-snug">
                                  {item.title}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-1.5">
                                <span
                                  className={`rounded-full border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${item.category.color}`}
                                >
                                  {item.category.label}
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>

              <div>
                {/* London Post */}
                <article
                  id="london-post"
                  className="grid overflow-hidden rounded-[1.5rem] border border-[#e8ded1] bg-[#fffaf3] lg:grid-cols-[0.9fr_1.1fr] scroll-mt-24 shadow-sm"
                >
                  <img
                    src={POSTS[0].image}
                    alt="London skyline and the River Thames"
                    className="h-full min-h-72 w-full object-cover"
                  />
                  <div className="p-7 sm:p-10">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-blue-200 bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        Travel
                      </span>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ef6c3b]">
                        {POSTS[0].date}
                      </p>
                    </div>
                    <h3 className="mt-3 font-[Georgia] text-3xl font-bold tracking-[-0.035em]">
                      {POSTS[0].title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-[#52717a]">{POSTS[0].body}</p>
                    <p className="mt-5 border-l-2 border-[#f7c96d] pl-4 font-[Georgia] text-lg italic leading-7 text-[#163b45]">
                      {POSTS[0].note}
                    </p>
                  </div>
                </article>

                {/* All Generated Stories */}
                {STORIES.map((story) => {
                  const isPoem =
                    story.slug === "the-refrigerator-hates-me" ||
                    story.slug === "when-the-clock-strikes-twelve";
                  const category = getStoryCategory(story);

                  return (
                    <article
                      id={story.slug}
                      key={story.slug}
                      className="mt-12 overflow-hidden rounded-[1.5rem] border border-[#e8ded1] bg-[#fffaf3] scroll-mt-24 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="px-7 pb-6 pt-8 text-left sm:px-12 sm:pb-8 sm:pt-10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${category.color}`}>
                            {category.label}
                          </span>
                        </div>
                        <h3 className="mt-2 max-w-3xl font-[Georgia] text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                          {story.title}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[#52717a]">
                          Written by {story.author}
                        </p>
                      </div>

                      {isPoem ? (
                        <div className="grid gap-8 px-7 pb-10 sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                          <div className={`flex gap-3 ${story.images.length > 1 ? "h-full flex-col" : ""}`}>
                            {story.images.slice(0, 3).map((image, index) => (
                              <img
                                key={image}
                                src={image}
                                alt={`${story.title} illustration ${index + 1}`}
                                className={`w-full rounded-2xl border border-[#e8ded1]/80 shadow-sm ${
                                  story.images.length === 1
                                    ? "aspect-[4/5] bg-[#f1e5d5] object-contain lg:sticky lg:top-24"
                                    : "h-48 object-cover lg:h-auto lg:min-h-0 lg:flex-1"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex flex-col justify-center max-w-2xl py-1">
                            <p className="whitespace-pre-line font-[Georgia] text-[1.05rem] leading-8 text-[#52717a]">
                              {story.body}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <StructuredStoryBody story={story} />
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="bg-[#163b45] px-5 py-20 text-white sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>02 / Rishi Research</SectionLabel>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">
              <h2 className="max-w-3xl font-[Georgia] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                Airports are not just places to wait. They are maps of how the world moves.
              </h2>
              <p className="text-base leading-7 text-[#c5d9d8]">
                A research shelf for questions, sketches, facts and observations about airports
                around the world.
              </p>
            </div>
            <article className="mt-10 grid overflow-hidden rounded-[1.5rem] bg-[#214e58] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10">
                <div className="flex items-center gap-3 text-sm font-bold text-[#f7c96d]">
                  <Plane className="size-5" /> Field note 001
                </div>
                <h3 className="mt-5 font-[Georgia] text-3xl font-bold">{POSTS[1].title}</h3>
                <p className="mt-5 text-base leading-8 text-[#c5d9d8]">{POSTS[1].body}</p>
                <p className="mt-5 border-l-2 border-[#ef6c3b] pl-4 font-[Georgia] text-lg italic leading-7 text-white">
                  {POSTS[1].note}
                </p>
              </div>
              <img
                src={POSTS[1].image}
                alt="Airplane wing above clouds"
                className="min-h-72 w-full object-cover"
              />
            </article>
          </div>
        </section>

        <section id="dreams" className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>03 / Dreams</SectionLabel>
              <h2 className="font-[Georgia] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                A page I am still filling in.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#52717a]">
                This space is for Rishi to add the places he wants to see, the questions he wants to
                answer and the things he wants to make.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-dashed border-[#d8cabc] bg-white p-6 shadow-[0_16px_44px_rgba(22,59,69,0.06)] sm:p-8">
              <label htmlFor="dreams" className="font-[Georgia] text-2xl font-bold text-[#163b45]">
                My dreams, in progress
              </label>
              <textarea
                id="dreams"
                value={dreams}
                onChange={(event) => updateDreams(event.target.value)}
                placeholder="I want to...\n\nI wonder if...\n\nOne day I will..."
                className="mt-5 min-h-52 w-full resize-y rounded-xl border border-[#e8ded1] bg-[#fffaf3] p-4 font-[Georgia] text-lg leading-8 text-[#163b45] outline-none placeholder:text-[#9aaeb0] focus:border-[#ef6c3b]"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b9da0]">
                Saved in this browser for now · ready for Rishi to make it his own
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#fffaf3] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-[#52717a]">
          <RishiMark />
          <p>Made with questions, maps and a growing notebook.</p>
        </div>
      </footer>
    </div>
  );
}
