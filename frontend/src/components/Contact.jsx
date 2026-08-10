import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { personal_details } from "../config/data.js";
import { sendMessage } from "../utils/api.js";
import { getVisitorKey } from "../utils/fingerprint.js";
import { SectionHeading } from "./Education.jsx";
import SocialLinks from "./SocialLinks.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await sendMessage(getVisitorKey(), form);
      setStatus("sent");
      setForm({ name: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="Contact" title="Leave a message or suggestion" />
      <p className="mt-4 max-w-xl text-muted">
        Have a role, project, feedback, or just want to say hi? Drop your name and a message below —
        I'll get notified right away and can reach you at{" "}
        <span className="text-cyan-glow">{personal_details.email}</span> if I follow up.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onSubmit={submit}
          className="glass col-span-3 space-y-4 rounded-xl p-6"
        >
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
              Name <span className="text-cyan-glow">*</span>
            </label>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan-glow/60"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
              Message / Suggestion <span className="text-cyan-glow">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder="What's on your mind?"
              className="w-full resize-none rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cyan-glow/60"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-6 py-3 font-semibold text-void shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "sent" ? (
              <>
                <FiCheckCircle /> Message sent
              </>
            ) : (
              <>
                <FiSend /> {status === "sending" ? "Sending..." : "Send message"}
              </>
            )}
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass col-span-2 flex flex-col justify-between rounded-xl p-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-violet-glow">Elsewhere</p>
            <p className="mt-2 text-sm text-muted">Find me around the web:</p>
            <SocialLinks className="mt-4" />
          </div>
          <div className="mt-8 space-y-1 font-mono text-xs text-muted">
            <p>📍 {personal_details.location}</p>
            <p>✉️ {personal_details.email}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
