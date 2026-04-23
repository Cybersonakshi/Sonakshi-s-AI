import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
console.log("API KEY LOADED:", process.env.GROQ_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/ai", async (req, res) => {
  try {
    const data = req.body;

    // Use custom prompt from frontend if provided, else build default
    const prompt = data.prompt || `
You are an expert career counselor for Indian students. Based on the student profile below, suggest exactly 3 career paths.

Student Profile:
- Name: ${data.name}
- Class: ${data.class}
- Subjects/Strengths: ${Array.isArray(data.subjects) ? data.subjects.join(", ") : data.subjects}
- Interests/Hobbies: ${Array.isArray(data.interests) ? data.interests.join(", ") : data.interests}
- Quiz Answers (0=Analytical/Tech, 1=Hands-on/Build, 2=People/Social, 3=Creative): ${JSON.stringify(data.quizAnswers)}

Respond ONLY with valid JSON. No markdown, no explanation:

{
  "careers": [
    {
      "name": "Career Title",
      "field": "Domain",
      "match": "95% Match",
      "why": "2-3 sentences with <strong>bold</strong> key phrases.",
      "roadmap": [
        { "phase": "Now (0–6 months)", "desc": "Specific steps." },
        { "phase": "Short-term (6–18 months)", "desc": "Next steps." },
        { "phase": "Mid-term (1–3 years)", "desc": "Education path." },
        { "phase": "Long-term (3+ years)", "desc": "Career goals." }
      ],
      "exams": ["Exam1", "Exam2", "Exam3"],
      "colleges": ["College1", "College2", "College3"]
    }
  ]
}

Return exactly 3 careers ranked by fit.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        max_tokens: 2500,
        temperature: 0.65,
        messages: [
          {
            role: "system",
            content: "You are a career counselor specializing in the Indian education system. Always respond with ONLY valid JSON. No markdown fences, no explanation, no preamble whatsoever."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return res.status(502).json({ error: "AI API request failed", detail: errText });
    }

    const result = await response.json();
    const rawText = result.choices[0].message.content.trim();

    // Strip markdown fences if model wraps in ```json ... ```
    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw:", rawText);
      return res.status(500).json({ error: "AI returned invalid JSON", raw: rawText });
    }

    res.json(parsed);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
});

// Catch-all: serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ PathAI Server running at http://localhost:${PORT}`);
});
