import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiUser } from "react-icons/fi";
import { introduceVisitor } from "../utils/api.js";
import {
  getVisitorKey,
  hasIntroduced,
  markIntroduced,
  dismissedIntroPopup,
  dismissIntroPopup,
} from "../utils/fingerprint.js";

export default function VisitorIntroPopup() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  useEffect(() => {
    if (hasIntroduced() || dismissedIntroPopup()) return;
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    dismissIntroPopup();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() && !form.email.trim() && !form.note.trim()) return;
    setStatus("sending");
    try {
      await introduceVisitor(getVisitorKey(), form);
      markIntroduced();
      setStatus("sent");
      setTimeout(() => setVisible(false), 1800);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="glass fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm rounded-2xl p-5 shadow-glow"
        >
          <button
            onClick={close}
            aria-label="Dismiss"
            className="absolute right-3 top-3 text-muted hover:text-ink"
          >
            <FiX size={16} />
          </button>

          {status === "sent" ? (
            <div className="flex items-center gap-2 py-2 text-sm text-mint">
              <FiUser /> Thanks for introducing yourself!
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-2">
                <FiUser className="text-cyan-glow" />
                <p className="font-display text-sm font-semibold text-ink">Mind introducing yourself?</p>
              </div>
              <p className="mb-3 text-xs text-muted">
                Let me know who you are! 👋
              </p>
              <form onSubmit={submit} className="space-y-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-xs text-ink outline-none focus:border-cyan-glow/60"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Email (optional)"
                  className="w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-xs text-ink outline-none focus:border-cyan-glow/60"
                />
                <input
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder="Tell me more here ? (optional)"
                  className="w-full rounded-lg border border-border bg-surface/60 px-3 py-2 text-xs text-ink outline-none focus:border-cyan-glow/60"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex-1 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-3 py-2 text-xs font-semibold text-void disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Say hi"}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg border border-border px-3 py-2 text-xs text-muted hover:text-ink"
                  >
                    Maybe later
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
