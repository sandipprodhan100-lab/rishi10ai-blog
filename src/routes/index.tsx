import { createFileRoute } from "@tanstack/react-router";

import { RishiLandingPage } from "@/components/landing/RishiLandingPage";

const SITE = "https://rishi10ai.com";
const OG_IMAGE = `${SITE}/og-cover.png`;
const TITLE = "Rishi — Blogposts and Research";
const DESC =
  "Rishi's notebook for London journeys, airport research and dreams still being written.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Rishi notes" },
      { property: "og:url", content: SITE },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE}/#organization`,
              name: "Rishi notes",
              alternateName: "Rishi's blog and research notebook",
              url: SITE,
              logo: OG_IMAGE,
              areaServed: "IN",
            },
            {
              "@type": "WebSite",
              "@id": `${SITE}/#website`,
              url: SITE,
              name: "Rishi notes",
              inLanguage: "en-IN",
              publisher: { "@id": `${SITE}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  component: () => <RishiLandingPage />,
});
