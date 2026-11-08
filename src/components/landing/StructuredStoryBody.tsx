import { AlertTriangle, CheckCircle2, HeartHandshake } from "lucide-react";
import type { Story } from "@/generated/stories";

export function StructuredStoryBody({ story }: { story: Story }) {
  const isMobileEssay = story.slug === "advantages-and-disadvantages-of-mobile-phones";
  const isSmartHome =
    story.slug === "the-smart-home-that-locked-the-doors-and-welcomed-something-else-inside";

  if (isMobileEssay) {
    const rawParagraphs = story.body.split(/\n\n+/);
    const advantagesStartIndex = rawParagraphs.findIndex(
      (paragraph) => paragraph.trim() === "ADVANTAGES OF MOBILE PHONES",
    );
    const disadvantagesStartIndex = rawParagraphs.findIndex(
      (paragraph) => paragraph.trim() === "DISADVANTAGES OF MOBILE PHONES",
    );
    const conclusionIndex = rawParagraphs.findIndex(
      (paragraph) => paragraph.trim() === "CONCLUSION",
    );
    return (
      <div className="mx-auto max-w-3xl px-7 pb-10 sm:px-12">
        {rawParagraphs.map((paragraph, index) => {
          const trimmed = paragraph.trim();
          const isAdvantage = index > advantagesStartIndex && index < disadvantagesStartIndex;
          const isDisadvantage = index > disadvantagesStartIndex && index < conclusionIndex;

          // Section headers
          if (trimmed === "ADVANTAGES OF MOBILE PHONES") {
            return (
              <div
                key={index}
                className="mt-10 mb-6 flex items-center gap-3 border-b-2 border-emerald-400/60 pb-3"
              >
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
              <div key={index} className="mt-12 mb-6">
                <div className="flex items-center gap-3 border-b-2 border-rose-400/60 pb-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-rose-100 text-rose-700">
                    <AlertTriangle className="size-5" />
                  </span>
                  <h4 className="font-[Georgia] text-2xl font-bold text-rose-950 tracking-tight">
                    Disadvantages of Mobile Phones
                  </h4>
                </div>
                {story.images[2] && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                    <img
                      src={story.images[2]}
                      alt="Digital eye strain and screen fatigue from mobile-phone use"
                      className="h-auto w-full object-cover"
                    />
                    <p className="border-t border-[#e8ded1] bg-[#fcfaf7] px-4 py-2.5 text-xs font-semibold text-[#6d8a92]">
                      Disadvantage: digital fatigue, disrupted sleep and isolation
                    </p>
                  </div>
                )}
              </div>
            );
          }

          if (trimmed === "CONCLUSION") {
            return (
              <div
                key={index}
                className="mt-12 mb-6 flex items-center gap-3 border-b-2 border-[#163b45]/30 pb-3"
              >
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
            const isFirstAdvantage = index === advantagesStartIndex + 1;
            const isSecondAdvantage = index === advantagesStartIndex + 2;

            return (
              <div key={index} className="my-6">
                <div
                  className={`rounded-2xl border p-6 ${
                    isDisadvantage
                      ? "border-rose-200/80 bg-rose-50/30"
                      : isAdvantage
                        ? "border-emerald-200/80 bg-emerald-50/40"
                        : "border-[#e8ded1] bg-white"
                  }`}
                >
                  <h5
                    className={`mb-3 font-[Georgia] text-xl font-bold ${
                      isDisadvantage
                        ? "text-rose-950"
                        : isAdvantage
                          ? "text-emerald-900"
                          : "text-[#163b45]"
                    }`}
                  >
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
                      Connected generation: Instant global communication and learning in the palm of
                      our hand
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
                      Accelerated learning: Accessing world knowledge and interactive studies
                      anytime
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

            return (
              <div key={index} className="my-6">
                <div className="rounded-2xl border border-rose-200/80 bg-rose-50/30 p-6">
                  <h5 className="font-[Georgia] text-xl font-bold text-rose-950 mb-4">{heading}</h5>
                  <ul className="space-y-4">
                    {bulletItems.map((item, bIndex) => {
                      const cleanItem = item.replace(/^•\s*/, "").trim();
                      const colonIndex = cleanItem.indexOf(":");
                      const title = colonIndex !== -1 ? cleanItem.substring(0, colonIndex) : "";
                      const desc =
                        colonIndex !== -1 ? cleanItem.substring(colonIndex + 1) : cleanItem;

                      return (
                        <li key={bIndex} className="flex items-start gap-3">
                          <span className="mt-2 size-2 shrink-0 rounded-full bg-rose-500" />
                          <p className="font-[Georgia] text-[1.02rem] leading-7 text-[#415e66]">
                            {title ? (
                              <strong className="text-[#163b45] font-bold">{title}:</strong>
                            ) : null}
                            {desc}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          }

          // Normal paragraph
          return (
            <div key={index} className="my-4">
              {index === 0 && story.images[3] && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#e8ded1] shadow-md">
                  <img
                    src={story.images[3]}
                    alt="The benefits and risks of mobile-phone use"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              <p className="font-[Georgia] text-[1.05rem] leading-8 text-[#52717a]">{trimmed}</p>
            </div>
          );
        })}
      </div>
    );
  }

  // Standard story layout (Smart home & other narratives)
  const paragraphs = story.body.split(/\n\n+/);
  const isFable =
    story.slug === "the-clever-crow" ||
    story.slug === "the-gold-giving-serpent" ||
    story.slug === "the-monkey-and-the-crocodile";
  return (
    <div className="mx-auto max-w-3xl px-7 pb-10 sm:px-12">
      {paragraphs.map((paragraph, index, arr) => {
        const isDialogue = paragraph.startsWith('"') || paragraph.includes(" whispered:");
        const isChapterHeading =
          story.slug === "the-house-of-ash-and-iron" && /^[IVXLCDM]+\.\s+\S/.test(paragraph);
        const isSystemDialogue =
          isSmartHome &&
          (paragraph.includes('"Welcome home,"') ||
            paragraph.includes('"Error,"') ||
            paragraph.includes("Analysis:"));

        // Determine image placement
        let imageToRender: string | undefined;
        if (isSmartHome) {
          if (index === 0 && story.images[0]) imageToRender = story.images[0];
          else if (index === 4 && story.images[1]) imageToRender = story.images[1];
          else if (index === 11 && story.images[2]) imageToRender = story.images[2];
        } else {
          // General story image spacing
          if (story.images.length === 1 && index === (isFable ? 1 : Math.floor(arr.length / 2))) {
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
            {isChapterHeading ? (
              <h4
                className={`mb-5 border-l-4 border-[#a8684c] pl-4 font-[Georgia] text-2xl font-bold leading-snug tracking-tight text-[#6b382c] ${index === 0 ? "" : "mt-10"}`}
              >
                {paragraph}
              </h4>
            ) : (
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
            )}

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
