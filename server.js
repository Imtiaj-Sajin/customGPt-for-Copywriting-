const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();
const port = 3001;  // Backend port

app.use(express.json());
app.use(cors());  // Allow requests from your React app

// Use the API key from the environment variable
const GOOGLE_API_KEY = process.env.API_KEY;

// API endpoint to generate content using Gemini
app.post('/generate-copy', async (req, res) => {
  const { promptType, audience, offer, cta, usp } = req.body;

  const prompt = `Generate a persuasive ${promptType} for ${audience}. Offer: ${offer}. CTA: ${cta}. USPs: ${usp}.`;

  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    
    // Send the generated text as the response
    res.json({ text: await result.response.text() });
  } catch (error) {
    // Improved error logging
    console.error("Error fetching data from Gemini/PaLM:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : 'Failed to generate copy' });
  }
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
