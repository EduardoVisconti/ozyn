// src/components/GlobalSeo.jsx
import Seo from "./Seo";
import { SITE } from "../lib/site";

export default function GlobalSeo() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/assets/hero.png`, // optional; swap when you have a logo asset
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/shop?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <Seo jsonLd={[org, website]} />;
}
