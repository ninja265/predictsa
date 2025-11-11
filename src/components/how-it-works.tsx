import Image from "next/image";

const steps = [
  {
    iconUrl: "https://em-content.zobj.net/thumbs/160/apple/354/world-map_1f5fa-fe0f.png",
    title: "Pick an event",
    copy: "Choose from politics, civics, culture, or sport — all SA-first.",
  },
  {
    iconUrl: "https://em-content.zobj.net/thumbs/160/apple/354/direct-hit_1f3af.png",
    title: "Choose YES or NO",
    copy: "Lock in the side that matches your conviction.",
  },
  {
    iconUrl: "https://em-content.zobj.net/thumbs/160/apple/354/money-mouth-face_1f911.png",
    title: "Enter stake and confirm",
    copy: "Preview payouts, fees, and profit before you confirm the prediction.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container py-20">
      <div className="mb-12 max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          How it works
        </p>
        <h2 className="text-4xl font-heading text-slate">
          3 uncomplicated steps.
        </h2>
        <p className="text-slate/70">
          Everything stays in-browser — no custody, no wallets, just a clean
          walk-through you can demo live.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-[6px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl"
          >
            <div className="mb-6 h-14 w-14">
              <Image
                src={step.iconUrl}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
            </div>
            <h3 className="text-xl font-heading text-slate">{step.title}</h3>
            <p className="mt-2 text-sm text-slate/70">{step.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
