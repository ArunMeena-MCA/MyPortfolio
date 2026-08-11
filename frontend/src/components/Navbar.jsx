import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personal_details } from "../config/data.js";

const LINKS = [
  { id: "coding", label: "Coding Profile" },
  { id: "resume", label: "Resume" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-glow/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-lg font-semibold tracking-wide text-ink"
        >
          <span className="text-gradient">{personal_details.name.split(" ")[0]}</span>
          <span className="text-muted">.code</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-cyan-glow"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="glass flex flex-col gap-1 px-6 pb-4 md:hidden">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="py-2 text-left font-mono text-xs uppercase tracking-widest text-muted hover:text-cyan-glow"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
