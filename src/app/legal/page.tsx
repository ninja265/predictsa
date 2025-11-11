export default function LegalPage() {
  return (
    <main className="container py-20">
      <div className="rounded-[6px] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-heading text-slate">Disclaimer</h1>
        <p className="mt-6 text-lg text-slate/80">
          SA Predicts is a non-operational product demo. No wagers are accepted.
          For demo use only.
        </p>
        <p className="mt-4 text-sm text-slate/70">
          This site stores demo state in your browser. It does not facilitate
          custody, payouts, or settlement. Use it to showcase the product
          experience only.
        </p>
      </div>
    </main>
  );
}
