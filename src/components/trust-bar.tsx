const trustClaims = [
  "SA-first design",
  "Transparent pricing",
  "Demo only",
];

export function TrustBar() {
  return (
    <div className="container">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-[6px] border border-white/10 bg-white/5 px-6 py-5 text-xs uppercase tracking-[0.3em] text-slate/70 backdrop-blur-lg md:justify-between">
        {trustClaims.map((claim, index) => (
          <div key={claim} className="flex items-center gap-3">
            <span>{claim}</span>
            {index < trustClaims.length - 1 && (
              <span className="text-accent" aria-hidden>
                •
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
