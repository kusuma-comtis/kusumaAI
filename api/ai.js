// api/ai.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  const text = req.body?.text || "Hello";

  try {
    const url = new URL("https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug");
    url.search = new URLSearchParams({
      text,
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

    // filter hasil
    let answer = data.answer || data.output || data.result || JSON.stringify(data);
    if (!answer.trim()) answer = "⚠️ tidak menemukan jawaban.";
    answer = answer.replace(/\\n/g, "\n").replace(/n\\/g, "\n");

    res.status(200).json({ text: answer });
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil respons AI", detail: err.message });
  }
}
