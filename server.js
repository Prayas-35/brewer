const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/brew-plan", (req, res) => {
  const grams = Number(req.body.grams);

  if (!grams || grams <= 0) {
    return res.status(400).json({ error: "'grams' must be a positive number." });
  }

  const waterMl = Math.round(grams * 16);
  const totalSeconds = 150 + Math.round(grams * 3);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const brewTime = `${minutes}m ${String(seconds).padStart(2, "0")}s`;

  return res.json({ grams, waterMl, brewTime });
});

app.listen(port, () => {
  console.log(`Pour-Over Brew Helper running at http://localhost:${port}`);
});