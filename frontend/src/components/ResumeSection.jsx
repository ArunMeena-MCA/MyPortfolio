import { motion } from "framer-motion";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import { personal_details } from "../config/data.js";
import { resumeUrl } from "../utils/api.js";
import { SectionHeading } from "./Education.jsx";

export default function ResumeSection() {
  if (!personal_details.resumeAvailable) return null;

  return (
    <section id="resume" className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Resume" title="My resume" />
        <a
          href={resumeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
        >
          <FiExternalLink size={14} /> Open in new tab
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="glass mt-8 overflow-hidden rounded-2xl"
      >
        {/* Only the first page is visible by default; the viewer's own
            scrollbar lets the visitor scroll through the remaining pages. */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-xs text-muted">
          <FiFileText className="text-cyan-glow" />
          resume.pdf — scroll inside the panel below to view more pages
        </div>
        <iframe
          title="Resume"
          src={`${resumeUrl()}#page=1&toolbar=0&view=FitH`}
          className="h-[85vh] w-full bg-panel"
        />
      </motion.div>
    </section>
  );
}
