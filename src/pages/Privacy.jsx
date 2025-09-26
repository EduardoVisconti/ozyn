export default function Privacy() {
  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
        This privacy policy explains what data we collect, how we use it, and your choices.
      </p>
      <ul className="mt-6 list-disc pl-5 text-sm space-y-2">
        <li>We collect basic order and account information you provide.</li>
        <li>We use analytics to improve our website and marketing.</li>
        <li>We don’t sell personal information.</li>
        <li>Contact: <a className="underline" href="mailto:privacy@ozyn.com">privacy@ozyn.com</a></li>
      </ul>
      <p className="mt-6 text-xs text-neutral-500">
        This is a simple template and not legal advice. Customize to your practices.
      </p>
    </div>
  );
}
