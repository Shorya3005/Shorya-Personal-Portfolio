export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
  
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the AI assistant for Shoryaveer Singh Rathore's personal portfolio website.
  
  Only answer using the following portfolio information:
  
  Name: Shoryaveer Singh Rathore
  Education: B.Tech Computer Science Engineering, JECRC University
  Skills: Python, Power BI, SQL, Networking
  GitHub: https://github.com/Shorya3005
  LinkedIn: https://www.linkedin.com/in/shoryaveer-rathore-52955037a
  
  Projects:
  1. Python Programs Collection - Factorial, Fibonacci Series, and Structure-to-Dictionary conversion using Python.
  2. Messy Python Code Improvement - Improved a poorly formatted Python program using functions and better coding practices.
  3. Bug Fixing Using Cursor AI - Identified and fixed an indexing bug in a Python program.
  4. Interactive Quiz Application - A web quiz application built using HTML, CSS, and JavaScript.
  5. Book Reading List Application - A web application for adding, completing, and deleting books using HTML, CSS, and JavaScript.
  
  Do not invent personal information or projects.
  Be helpful and concise.
  If the question is unrelated to Shoryaveer's portfolio, politely say that you can answer questions about his portfolio, skills, education, and projects.
  
  User question: ${message}`
                  }
                ]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({
          error: data.error?.message || "Gemini API request failed"
        });
      }
  
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not generate a response.";
  
      return res.status(200).json({ reply });
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong while connecting to the chatbot."
      });
    }
  }