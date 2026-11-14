"use client";

import { useEffect, useState } from "react";
import { LINKS } from "../links";

const items = [
  { href: "#mission", label: "Mission" },
  { href: LINKS.careers, label: "Careers", ext: true },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" aria-label="Anaula — home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="anaula-wordmark.png" alt="Anaula" width={111} height={30} className="h-[26px] w-auto md:h-[30px]" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-ink/65 transition-colors hover:text-ink"
            >
              {i.label}
              {i.ext && <span aria-hidden> ↗</span>}
            </a>
          ))}
          <a
            href={LINKS.book}
            target="_blank"
            rel="noopener noreferrer"
            className="btn h-10 bg-ink px-5 text-sm text-paper hover:bg-cell-deep"
          >
            Book a meeting
          </a>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mnav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mnav"
        className={`fixed inset-x-0 bottom-0 top-16 bg-paper transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="wrap flex h-full flex-col items-center justify-center gap-7 pb-16 text-center" aria-label="Mobile">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              onClick={() => setOpen(false)}
              {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="display text-5xl"
            >
              {i.label}
            </a>
          ))}
          <a href={LINKS.book} target="_blank" rel="noopener noreferrer" className="btn mt-4 bg-ink text-paper">
            Book a meeting <span className="arr">→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
