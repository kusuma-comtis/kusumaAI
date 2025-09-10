// api/ai.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const text = req.method === "POST"
    ? (req.body?.text || "")
    : (req.query?.text || "");

  try {
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

    // Ambil respons yang relevan
    let result = "";
    if (typeof data === "string") result = data;
    else if (data.answer) result = data.answer;
    else if (data.output) result = data.output;
    else if (data.result) result = data.result;
    else result = JSON.stringify(data);

    result = result.replace(/\\n/g, "\n").replace(/n\\/g, "\n").trim();

    return res.status(200).json({ success: true, text: result });
  } catch (err) {
    return res.status(500).json({ error: "Gagal ambil respons AI", detail: err.message });
  }
}
