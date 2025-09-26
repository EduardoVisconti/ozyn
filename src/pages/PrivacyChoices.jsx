export default function PrivacyChoices() {
  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Your Privacy Choices</h1>
      <p className="mt-4 max-w-3xl text-sm text-neutral-700 dark:text-neutral-300">
        For California residents: you can request to opt out of the sale/sharing of personal information
        or request deletion/correction of your data.
      </p>
      <ul className="mt-4 list-disc pl-5 text-sm space-y-2">
        <li>Email: <a className="underline" href="mailto:privacy@ozyn.com">privacy@ozyn.com</a></li>
        <li>Include: name, email, request type (opt-out / delete / correct).</li>
      </ul>
      <p className="mt-6 text-xs text-neutral-500">
        We’ll add a cookie preferences tool later to manage analytics/ads cookies.
      </p>
    </div>
  );
}
