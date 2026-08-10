import { personal_details } from "../config/data.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {personal_details.name}. Built with React, Tailwind & Framer Motion.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
