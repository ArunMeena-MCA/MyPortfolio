require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const trackRoute = require("./routes/track");
const introduceRoute = require("./routes/introduce");
const messageRoute = require("./routes/message");
const analyticsRoute = require("./routes/analytics");
const resumeRoute = require("./routes/resume");
const leetcodeRoute = require("./routes/leetcode");
const gfgRoute = require("./routes/gfg");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// app.use(
//   cors({
//     origin: CLIENT_ORIGIN,
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: "https://my-portfolio-a-one.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Basic rate limiting so the contact form / analytics login can't be hammered.
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

app.use("/api/", generalLimiter);
app.use("/api/analytics/login", loginLimiter);

app.get("/api/health", (req, res) => res.json({ ok: true, service: "portfolio-backend" }));

app.use("/api/track", trackRoute);
app.use("/api/introduce", introduceRoute);
app.use("/api/message", messageRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/leetcode", leetcodeRoute);
app.use("/api/gfg", gfgRoute);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// app.listen(PORT, () => {
//   console.log(`Portfolio backend running on http://localhost:${PORT}`);
// });

module.exports = app;
