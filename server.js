const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function fetchAI(text) {
  const url = new URL("https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug");
  url.search = new URLSearchParams({
    text: text || "Hello",
    country: "Europe",
    user_id: "Av0SkyG00D",
  }).toString();

  const { data } = await axios.get(url.toString(), {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.ai4chat.co/pages/riddle-generator",
    },
    timeout: 20000,
  });

  // 🔎 Filter hasil AI
  let result = "";
  if (typeof data === "string") result = data;
  else if (data.answer) result = data.answer;
  else if (data.output) result = data.output;
  else if (data.result) result = data.result;
  else result = JSON.stringify(data);

  result = result.replace(/\\n/g, "\n").replace(/n\\/g, "\n").trim();

  return { success: true, text: result };
}

// GET route
app.get("/chat", async (req, res) => {
  try {
    const data = await fetchAI(req.query.text || "");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil respons AI", detail: err.message });
  }
});

// POST route (frontend pakai ini)
app.post("/ai", async (req, res) => {
  try {
    const text = req.body.text ? String(req.body.text) : "";
    const data = await fetchAI(text);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil respons AI", detail: err.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
