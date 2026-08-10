import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { social_accounts } from "../config/data.js";

const ICONS = {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  SiLeetcode,
  FaGlobe,
};

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {social_accounts.map((acc) => {
        const Icon = ICONS[acc.icon] || FaGlobe;
        return (
          <a
            key={acc.id}
            href={acc.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={acc.label}
            title={acc.label}
            className="group grid h-10 w-10 place-items-center rounded-full border border-border bg-panel/60 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/60 hover:text-cyan-glow hover:shadow-glow"
          >
            <Icon size={17} />
          </a>
        );
      })}
    </div>
  );
}
