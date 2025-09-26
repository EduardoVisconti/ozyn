export default function SizeGuide() {
  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Size Guide</h1>
      <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
        Use your measurements and compare to the chart below. If you’re between sizes, we recommend sizing up for a more relaxed fit.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Bust (in)</th>
              <th className="px-4 py-3 text-left">Waist (in)</th>
              <th className="px-4 py-3 text-left">Hip (in)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["XS", "30–32", "23–25", "33–35"],
              ["S", "32–34", "25–27", "35–37"],
              ["M", "34–36", "27–29", "37–39"],
              ["L", "36–38", "29–31", "39–41"],
              ["XL", "38–40", "31–33", "41–43"],
            ].map((r) => (
              <tr key={r[0]} className="border-t border-neutral-200 dark:border-neutral-800">
                {r.map((c) => <td key={c} className="px-4 py-3">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-neutral-500">Measurements are approximate; fabrics vary in stretch.</p>
    </div>
  );
}
