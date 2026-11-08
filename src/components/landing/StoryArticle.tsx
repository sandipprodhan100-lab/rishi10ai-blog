import type { Story } from "@/generated/stories";
import { getStoryCategory, getStorySurface } from "./landing-content";
import { StructuredStoryBody } from "./StructuredStoryBody";

export function StoryArticle({ story }: { story: Story }) {
  const isPoem =
    story.slug === "the-refrigerator-hates-me" || story.slug === "when-the-clock-strikes-twelve";
  const category = getStoryCategory(story);
  const surface = getStorySurface(story);

  return (
    <article
      id={story.slug}
      key={story.slug}
      className={`mt-12 overflow-hidden rounded-[1.5rem] border border-[#e8ded1] ${surface} scroll-mt-24 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="px-7 pb-6 pt-8 text-left sm:px-12 sm:pb-8 sm:pt-10">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${category.color}`}
          >
            {category.label}
          </span>
        </div>
        <h3 className="mt-2 max-w-3xl font-[Georgia] text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
          {story.title}
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#52717a]">Written by {story.author}</p>
      </div>

      {isPoem ? (
        <div className="px-7 pb-10 sm:px-12">
          {story.images.length === 1 ? (
            <>
              <img
                src={story.images[0]}
                alt={`${story.title} illustration`}
                className="h-auto w-full rounded-2xl border border-[#e8ded1]/80 object-contain shadow-sm"
              />
              <div className="mx-auto mt-8 max-w-2xl">
                <p className="whitespace-pre-line font-[Georgia] text-[1.05rem] leading-8 text-[#52717a]">
                  {story.body}
                </p>
              </div>
            </>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="flex h-full flex-col gap-3">
                {story.images.slice(0, 3).map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${story.title} illustration ${index + 1}`}
                    className="h-48 w-full rounded-2xl border border-[#e8ded1]/80 object-cover shadow-sm lg:h-auto lg:min-h-0 lg:flex-1"
                  />
                ))}
              </div>
              <div className="flex max-w-2xl flex-col justify-center py-1">
                <p className="whitespace-pre-line font-[Georgia] text-[1.05rem] leading-8 text-[#52717a]">
                  {story.body}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <StructuredStoryBody story={story} />
      )}
      <div className="px-7 pb-8 sm:px-12">
        <a
          href="#story-index"
          className="text-sm font-bold text-[#163b45] underline decoration-[#ef6c3b] underline-offset-4 hover:text-[#c94f25]"
        >
          Back to the notebook
        </a>
      </div>
    </article>
  );
}
