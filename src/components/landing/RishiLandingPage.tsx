import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { STORIES } from "@/generated/stories";
import { PODCAST, POSTS } from "./landing-content";
import { RishiMark, SectionLabel } from "./LandingShared";
import { StoryArticle } from "./StoryArticle";
import { StoryIndex } from "./StoryIndex";

export function RishiLandingPage() {
  const [dreams, setDreams] = useState("");
  useEffect(() => {
    setDreams(window.localStorage.getItem("rishi-dreams") ?? "");
  }, []);

  function updateDreams(value: string) {
    setDreams(value);
    window.localStorage.setItem("rishi-dreams", value);
  }

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#163b45]">
      <header className="sticky top-0 z-30 border-b border-[#e8ded1]/80 bg-[#fffaf3]/90 px-5 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <RishiMark />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#52717a] md:flex">
            <a href="#blog" className="transition-colors hover:text-[#ef6c3b]">
              Blogpost
            </a>
            <a href="#research" className="transition-colors hover:text-[#ef6c3b]">
              Research
            </a>
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
                <span className="size-2 rounded-full bg-[#79b95c]" /> A curious corner of the
                internet
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
                  href="#story-index"
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
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
              <h2 className="max-w-2xl font-[Georgia] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                Stories, ideas and adventures from my notebook.
              </h2>
              <p className="max-w-xs text-sm leading-6 text-[#52717a]">
                Explore stories, poems, research and more, all in one place.
              </p>
            </div>

            <article
              id={PODCAST.id}
              className="mb-12 scroll-mt-24 overflow-hidden rounded-[1.5rem] border border-[#e8ded1] bg-[#f3fafb] shadow-sm"
            >
              <div className="px-7 pb-6 pt-8 sm:px-12 sm:pb-8 sm:pt-10">
                <span className="rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800">
                  Podcast
                </span>
                <h3 className="mt-3 font-[Georgia] text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                  {PODCAST.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52717a]">
                  Watch my videos here or on YouTube.
                </p>
                <a
                  href="#story-index"
                  className="mt-3 inline-block text-sm font-bold text-[#163b45] underline decoration-[#ef6c3b] underline-offset-4 hover:text-[#c94f25]"
                >
                  Skip to the notebook
                </a>
              </div>
              <div className="px-7 pb-8 sm:px-12 sm:pb-10">
                <div className="grid gap-8 md:grid-cols-2">
                  {PODCAST.videos.map((video) => (
                    <div
                      key={video.videoId}
                      id={video.id === PODCAST.id ? undefined : video.id}
                      className="min-w-0 scroll-mt-24"
                    >
                      <h4 className="mb-3 font-[Georgia] text-xl font-bold">{video.title}</h4>
                      <div className="aspect-video overflow-hidden rounded-2xl border border-[#e8ded1] bg-black shadow-sm">
                        <iframe
                          className="size-full"
                          src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                          title={`${video.title} on YouTube`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-full bg-[#163b45] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ef6c3b]"
                      >
                        Watch on YouTube
                        <span className="sr-only">: {video.title}</span>
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href="#story-index"
                  className="mt-6 inline-block text-sm font-bold text-[#163b45] underline decoration-[#ef6c3b] underline-offset-4 hover:text-[#c94f25]"
                >
                  Explore the notebook
                </a>
              </div>
            </article>

            <StoryIndex />

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
                  <a
                    href="#story-index"
                    className="mt-6 inline-block text-sm font-bold text-[#163b45] underline decoration-[#ef6c3b] underline-offset-4 hover:text-[#c94f25]"
                  >
                    Back to the notebook
                  </a>
                </div>
              </article>

              {/* All Generated Stories */}
              {STORIES.map((story) => (
                <StoryArticle key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="scroll-mt-24 bg-[#163b45] px-5 py-20 text-white sm:px-8">
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
                <a
                  href="#story-index"
                  className="mt-6 inline-block text-sm font-bold text-white underline decoration-[#f7c96d] underline-offset-4 hover:text-[#f7c96d]"
                >
                  Back to the notebook
                </a>
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
