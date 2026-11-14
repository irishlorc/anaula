import Nav from "./components/Nav";
import Reactor from "./components/Reactor";
import Reveal from "./components/Reveal";
import { LINKS } from "./links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Index({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${dark ? "text-paper/55" : "text-ink/55"}`}>
      <span>{n}</span>
      <span className={`h-px w-8 ${dark ? "bg-paper/30" : "bg-ink/30"}`} />
      <span>{label}</span>
    </div>
  );
}

const LOOP = [
  {
    k: "Sense",
    d: "The reactor reads its own state, continuously.",
    icon: (
      <path d="M4 20c4 0 4-12 8-12s4 12 8 12 4-8 8-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ),
  },
  {
    k: "Control",
    d: "The operating layer decides what the process needs.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="3" />
        <path d="M16 3v5M16 24v5M3 16h5M24 16h5" />
      </g>
    ),
  },
  {
    k: "Correct",
    d: "Deviations are acted on before a batch is lost.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 16a10 10 0 1 1-3-7.1" />
        <path d="M24 3v6h-6" />
        <path d="M11 16.5l3.5 3.5 6.5-7" />
      </g>
    ),
  },
];

const TEAM = [
  { k: "Production", d: <>Built mechanical and electronic production plants at <b>Intel</b>, <b>Google</b> and <b>MSD</b>.</> },
  { k: "Robotics", d: <>Designed underwater robotic systems.</> },
  { k: "Biology", d: <>Two and a half years of research on photosynthetic organisms.</> },
];

const BACKERS = ["Deepchecks", "Discipulus Ventures", "NDRC", "Collab+Currency"];

export default function Home() {
  return (
    <>
      <Nav />
      <Reveal />
      <main id="top">
        {/* HERO */}
        <section className="grid-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,var(--color-paper)_72%)]" />
          <svg className="cells pointer-events-none absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 1400 900">
            {[
              [1250, 130, 54], [960, 800, 90], [1340, 560, 40], [40, 860, 60], [700, 860, 30],
            ].map(([x, y, r], i) => (
              <g key={i} className="cell" style={{ animationDelay: `${i * -3}s` }}>
                <circle cx={x} cy={y} r={r} fill="var(--color-cell)" fillOpacity="0.07" stroke="var(--color-cell)" strokeOpacity="0.3" />
                <circle cx={x - r * 0.3} cy={y + r * 0.1} r={r * 0.09} fill="var(--color-cell)" fillOpacity="0.6" />
                <circle cx={x + r * 0.25} cy={y - r * 0.3} r={r * 0.06} fill="var(--color-cell)" fillOpacity="0.5" />
                <circle cx={x + r * 0.1} cy={y + r * 0.45} r={r * 0.05} fill="var(--color-cell)" fillOpacity="0.5" />
              </g>
            ))}
          </svg>
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="eyebrow reveal text-ink/55">Autonomous bioreactors · Dublin</p>
              <h1 className="display reveal mt-6 text-[clamp(48px,8.4vw,112px)]">
                Bioreactors
                <br />
                that run <em className="text-cell-deep">themselves.</em>
              </h1>
              <p className="reveal mx-auto mt-7 max-w-[34ch] text-lg leading-relaxed text-ink/70 md:text-xl lg:mx-0">
                Anaula builds autonomous bioreactors for pharmaceutical and biological production. Reactors that sense,
                control and correct themselves.
              </p>
              <div className="reveal mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href={LINKS.book} {...ext} className="btn bg-ink text-paper hover:bg-cell-deep">
                  Book a meeting <span className="arr">→</span>
                </a>
                <a href="#approach" className="btn border border-ink/25 text-ink hover:border-ink">
                  How it works
                </a>
              </div>
            </div>
            <div className="reveal">
              <Reactor />
            </div>
          </div>
        </section>

        {/* BACKERS */}
        <section aria-label="Backers" className="pb-6">
          <div className="wrap">
            <div className="reveal flex flex-col items-center gap-6 border-y border-ink/10 py-8 md:flex-row md:justify-between">
              <p className="eyebrow text-ink/50">Backed by</p>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-4 text-center sm:flex sm:flex-wrap sm:items-center sm:justify-center md:justify-end">
                {BACKERS.map((b) => (
                  <li key={b} className="text-[15px] font-semibold uppercase tracking-[0.08em] text-ink/55 md:text-base">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 01 MISSION */}
        <section id="mission" className="py-24 md:py-36">
          <div className="wrap grid gap-10 md:grid-cols-[220px_1fr]">
            <div className="reveal flex justify-center md:block">
              <Index n="01" label="Mission" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="display reveal text-[clamp(40px,6.6vw,96px)]">
                Biology is the most powerful manufacturing system on <em>Earth.</em>
              </h2>
              <p className="reveal mx-auto mt-10 max-w-[46ch] text-lg leading-relaxed text-ink/70 md:mx-0 md:text-xl">
                Anaula harnesses this power for pharmaceutical and biological production, optimising every step of
                the way.
              </p>
            </div>
          </div>
        </section>

        {/* 02 APPROACH */}
        <section id="approach" className="border-t border-ink/10 pb-24 md:pb-36">
          <div className="wrap pt-20 md:pt-28">
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div className="reveal flex justify-center md:block">
                <Index n="02" label="The bottleneck" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="display reveal text-[clamp(36px,5.2vw,76px)]">
                  The bottleneck in biological manufacturing is no longer the biology. It&rsquo;s{" "}
                  <em className="text-cell-deep">infrastructure.</em>
                </h2>
                <p className="reveal mx-auto mt-8 max-w-[52ch] leading-relaxed text-ink/70 md:mx-0 md:text-lg">
                  Batch failures are still mostly caused by operator error, and after fifteen years of hardware
                  improvement the ceiling is now human. We build the autonomous operating layer that removes it: reactors
                  that sense, control, and correct themselves without someone standing over them.
                </p>
              </div>
            </div>

            <div className="relative mt-16 md:mt-24">
                            <ol className="grid grid-cols-3 gap-2 md:gap-6">
                {LOOP.map((s, i) => (
                  <li
                    key={s.k}
                    className="reveal group relative rounded-2xl border border-ink/10 bg-paper-2/60 px-2 py-6 text-center transition-colors hover:border-ink/40 md:p-8"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className="mx-auto flex h-12 w-12 items-center md:h-[60px] md:w-[60px] justify-center rounded-full border border-ink/20 bg-paper text-ink transition-colors group-hover:bg-cell group-hover:text-ink">
                      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
                        {s.icon}
                      </svg>
                    </div>
                    <p className="eyebrow mt-6 hidden text-ink/50 md:block">Step {i + 1}</p>
                    <h3 className="display mt-4 text-2xl md:mt-2 md:text-4xl">{s.k}</h3>
                    <p className="mx-auto mt-3 hidden max-w-[26ch] text-ink/65 md:block">{s.d}</p>
                  </li>
                ))}
              </ol>
              <p className="eyebrow reveal mt-8 text-center text-ink/45">↻ Then again, every second of the run</p>
            </div>
          </div>
        </section>

        {/* 03 TEAM */}
        <section id="team" className="bg-ink py-24 text-paper md:py-36">
          <div className="wrap grid gap-10 md:grid-cols-[220px_1fr]">
            <div className="reveal flex justify-center md:block">
              <Index n="03" label="Team" dark />
            </div>
            <div>
              <h2 className="display reveal text-center text-[clamp(34px,4.8vw,68px)] md:text-left">
                We know what breaks inside a production facility, and we know how to build systems that{" "}
                <em className="text-cell">don&rsquo;t.</em>
              </h2>
              <dl className="mt-14 border-t border-line">
                {TEAM.map((t) => (
                  <div
                    key={t.k}
                    className="reveal grid gap-2 border-b border-line py-7 text-center md:grid-cols-[200px_1fr] md:items-baseline md:text-left"
                  >
                    <dt className="eyebrow text-mute">{t.k}</dt>
                    <dd className="font-serif text-2xl leading-snug text-paper/90 md:text-3xl [&_b]:font-medium [&_b]:text-paper">
                      {t.d}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="reveal mt-10 text-center text-paper/55 md:text-left">
                Anaula is pre-seed, based in Dublin, Ireland, with a US presence.
              </p>
            </div>
          </div>

          
        </section>

        {/* CAREERS */}
        <section className="bg-cell-soft">
          <div className="wrap flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="eyebrow text-cell-deep">We&rsquo;re hiring</p>
              <p className="display mt-3 text-3xl md:text-4xl">Bioprocess and electronics engineers.</p>
            </div>
            <a href={LINKS.careers} {...ext} className="btn bg-ink text-paper hover:bg-cell-deep">
              View open roles <span className="arr">↗</span>
            </a>
          </div>
        </section>

        {/* 04 CONTACT */}
        <section id="contact" className="bg-cell py-24 text-ink md:py-36">
          <div className="wrap grid gap-10 md:grid-cols-[220px_1fr]">
            <div className="reveal flex justify-center md:block">
              <Index n="04" label="Contact" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="display reveal text-[clamp(48px,8vw,120px)]">
                Partner or build <em>with Anaula.</em>
              </h2>
              <p className="reveal mx-auto mt-8 max-w-[40ch] text-lg text-ink/75 md:mx-0 md:text-xl">
                Book a 15-minute call with Ruairí McLoughlin.
              </p>
              <div className="reveal mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href={LINKS.book} {...ext} className="btn bg-ink text-paper hover:bg-ink-2">
                  Book a meeting <span className="arr">→</span>
                </a>
                <a href={LINKS.linkedin} {...ext} className="btn border border-ink/40 hover:border-ink">
                  LinkedIn <span className="arr">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="wrap flex flex-col items-center gap-5 text-sm text-ink/55 md:flex-row md:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anaula-wordmark.png" alt="Anaula" width={96} height={26} className="h-6 w-auto" />
          <div className="flex gap-6">
            <a href={LINKS.careers} {...ext} className="hover:text-ink">Careers</a>
            <a href={LINKS.linkedin} {...ext} className="hover:text-ink">LinkedIn</a>
          </div>
          <span>© Anaula · Dublin, Ireland</span>
        </div>
      </footer>
    </>
  );
}
