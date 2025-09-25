import { Link } from "react-router-dom";

export default function SectionHeader({ title, ctaLabel, ctaTo }) {
  return (
    <div className="mb-10 md:mb-12 flex items-end justify-between page-x">
      <h2 className="text-xl font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="text-sm uppercase tracking-wide text-neutral-700 hover:opacity-80 dark:text-neutral-300"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
