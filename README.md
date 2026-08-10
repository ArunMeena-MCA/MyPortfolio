# Portfolio Website — Arun

A futuristic, animated, fully config-driven portfolio. Frontend: **React + Vite + Tailwind CSS + Framer Motion**.
Backend: **Node.js + Express + SQLite (better-sqlite3)** for visitor analytics and contact messages.

```
portfolio-website/
├── backend/     Express API + SQLite database
└── frontend/    React + Vite + Tailwind site
```

## 1. Edit your info (the only file you need to touch regularly)

Open **`frontend/src/config/data.js`**. Everything on the site is driven from here:

- `personal_details` — name, title, tagline, bio, email, avatar path, resume toggle
- `social_accounts` — GitHub / LinkedIn / LeetCode / Instagram (add/remove freely, icon names come from `react-icons`)
- `educational_details` — array of education entries
- `professional` — array of work-experience entries
- `projects` — array of projects. **Leave `liveLink: ""` for any project that isn't deployed** — the "Live Demo" button automatically hides itself when that field is empty. `github` similarly hides the "View Code" button if empty.

No component code needs to change when you edit this file — just save and the site updates.

### Images
Put images in `frontend/public/`:
- `avatar.jpg` → your profile photo (referenced as `/avatar.jpg` in config)
- `projects/your-thumbnail.jpg` → project thumbnails (referenced as `/projects/your-thumbnail.jpg`)
If an image is missing, it just won't render — the layout won't break.

### Resume
Drop your PDF at `backend/data/resume.pdf`. The "View Resume" button scrolls down to an in-page **Resume section**
that embeds the PDF inline (served via `GET /api/resume` with `Content-Disposition: inline`, so it's viewed, not
downloaded). Only the first page is visible by default — the panel has its own scrollbar for the rest of the pages.
An "Open in new tab" link is also provided next to it. Set `personal_details.resumeAvailable = false` in the config
to hide the resume button and section entirely.

## 2. Run it locally

### Backend
```bash
cd backend
npm install
cp .env.example .env      # edit ANALYTICS_PASSWORD if you want a different default than "1"
npm start                 # runs on http://localhost:5000
```
The SQLite database file is created automatically at `backend/data/portfolio.db` on first run.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL should point at your backend
npm run dev                # runs on http://localhost:5173
```

### Email notifications for messages/suggestions
The contact form (Name + Message — email intentionally left out to keep it a 2-field flow) sends you an email the
moment someone submits it. Configure this in `backend/.env`:
```
GMAIL_USER=gmail1@gmail.com          # the Gmail account that SENDS the notification
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
NOTIFY_EMAIL=gmail2@gmail.com        # the account that RECEIVES it (can be the same or different)
```
`GMAIL_APP_PASSWORD` must be a Gmail **app password**, not your normal login password — generate one at
https://myaccount.google.com/apppasswords (requires 2-Step Verification enabled on the sending account). If these
env vars aren't set, the site still works and saves the message to the database — it just skips sending the email
and logs a warning in the server console.

Open `http://localhost:5173`. Visit `http://localhost:5173/analytics` for the visitor dashboard (default password `1` — change it from the "Password" button once logged in, or set `ANALYTICS_PASSWORD` in `backend/.env` before first run).

## 3. How visitor tracking works

- On page load, the frontend computes a lightweight **browser fingerprint** (canvas + WebGL + device/screen info, hashed) and persists it in `localStorage`. This is sent to `POST /api/track` along with the request IP, which the backend uses to upsert a `visitors` row and log a `visits` row.
- After ~8 seconds on the site, a **bottom-right popup** invites the visitor to optionally share their name/email/reason for visiting (`POST /api/introduce`). This is entirely optional and dismissible; dismissing it won't ask again for that browser session.
- The contact form (`POST /api/message`) is separate from the intro popup — visitors can always leave you a message regardless of whether they introduced themselves.
- `/analytics` (password protected) shows: total unique visitors, total visits, total messages, a visits-per-day chart, a table of every visitor (with visit counts, first/last seen, and name/email if they introduced themselves), a raw visit log, and all contact messages. There's also an **Inbox** button (top right) that opens a mail-style list of message senders — click a name to see their full message.

## 4. Deploying

- **Backend**: deploy anywhere that runs Node (Render, Railway, Fly.io, a VPS, etc). SQLite is file-based, so make sure the host has a persistent disk/volume for `backend/data/portfolio.db`. Set `CLIENT_ORIGIN` in `.env` to your deployed frontend URL (for CORS + cookies).
- **Frontend**: `npm run build` produces a static `dist/` folder — deploy to Vercel, Netlify, Cloudflare Pages, etc. Set `VITE_API_URL` to your deployed backend's `/api` URL at build time.
- Because the analytics login uses an `httpOnly` cookie, make sure both are served over **HTTPS** in production and that `CLIENT_ORIGIN`/`VITE_API_URL` match exactly (protocol + domain) or the cookie won't be sent cross-site.

## 5. Notes

- The "Live Demo" and "View Code" buttons on project cards/modals are conditionally rendered — only projects with a non-empty `liveLink`/`github` in the config show those buttons.
- Rate limiting is enabled on the API (300 req/15min general, 20 req/15min on the analytics login) to deter abuse of the contact form and password guessing.
- The database also stores IP address and user agent per visitor/visit for your own reference in the analytics tables.
