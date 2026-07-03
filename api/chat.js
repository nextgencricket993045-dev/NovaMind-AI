export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method Not Allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: req.body.message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({
        reply: data.error.message
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response from Gemini.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: error.message
    });
  }
}