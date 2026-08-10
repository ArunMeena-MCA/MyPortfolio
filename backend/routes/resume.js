const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// GET /api/resume  -> streams /backend/data/resume.pdf INLINE (for embedding
// in the site's Resume section), not as a forced download.
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "resume.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Resume not uploaded yet. Place resume.pdf in backend/data/" });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');
  fs.createReadStream(filePath).pipe(res);
});

module.exports = router;
