import type { Story } from "@/generated/stories";

export const POSTS = [
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

export const PODCAST = {
  id: "sons-singing-podcast",
  title: "My podcast",
  videos: [
    { id: "sons-singing-podcast", title: "My podcast", videoId: "KZFpl00Notg" },
    {
      id: "podcast-woh-kala-ek-bansuri-wala",
      title: "Woh Kala Ek Bansuri Wala",
      videoId: "eZ5YUT6LCCc",
    },
  ],
} as const;

export function getStoryCategory(story: Story): { label: string; color: string } {
  if (
    story.slug === "the-refrigerator-hates-me" ||
    story.slug === "when-the-clock-strikes-twelve"
  ) {
    return { label: "Poem", color: "bg-purple-100 text-purple-800 border-purple-200" };
  }
  if (story.slug === "advantages-and-disadvantages-of-mobile-phones") {
    return { label: "Articles", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  }
  if (story.slug === "the-future-of-remote-work-in-the-ai-era") {
    return { label: "Articles", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  }
  return { label: "Story", color: "bg-sky-100 text-sky-800 border-sky-200" };
}

export function getStorySurface(story: Story): string {
  switch (story.slug) {
    case "the-coordinate-of-autumn":
      return "bg-[#fff9ef]";
    case "the-refrigerator-hates-me":
      return "bg-[#fcf7ff]";
    case "when-the-clock-strikes-twelve":
      return "bg-[#fff7f5]";
    case "the-smart-home-that-locked-the-doors-and-welcomed-something-else-inside":
      return "bg-[#f3fafb]";
    case "advantages-and-disadvantages-of-mobile-phones":
      return "bg-[#f6fcf5]";
    case "the-future-of-remote-work-in-the-ai-era":
      return "bg-[#f3f8fc]";
    case "the-house-of-ash-and-iron":
      return "bg-[#f8f5f4]";
    case "the-clever-crow":
      return "bg-[#fffaf0]";
    case "the-gold-giving-serpent":
      return "bg-[#fff8ed]";
    case "the-monkey-and-the-crocodile":
      return "bg-[#f4fbf7]";
    default:
      return "bg-[#fffaf3]";
  }
}
