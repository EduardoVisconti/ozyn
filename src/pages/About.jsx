import Seo from "../components/Seo";
import { SITE } from "../lib/site";

export default function About() {
  return (
    <div className="page-x py-12 md:py-16">
      <Seo
        title={`About ${SITE.name}`}
        description="OZYN is women’s training apparel — focused on fit, longevity and minimalist design."
        canonical={`${SITE.url}/about`}
      />
      <h1 className="text-2xl font-semibold">About OZYN</h1>
      <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
        {SITE.name} is women’s training apparel: gym, yoga, and the in-between. We start
        small, make what athletes actually wear, and focus on fit, mobility and durability.
        Thoughtful fabrics, clean design, and a commitment to improve every drop.
      </p>
    </div>
  );
}
