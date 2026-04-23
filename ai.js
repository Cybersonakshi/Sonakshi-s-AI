 export default async function handler(req, res) {
  try {
    const data = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `
You are a career counselor for Indian students.

Student Details:
Name: ${data.name}
Class: ${data.class}
Subjects: ${data.subjects}
Interests: ${data.interests}
Quiz Answers: ${data.quizAnswers}

Give:
- Top 3 careers
- Why each fits
- Roadmap
- Exams

Keep it simple and structured.
`
          }
        ]
      })
    });

    const result = await response.json();

    res.status(200).json({
      result: result.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
}