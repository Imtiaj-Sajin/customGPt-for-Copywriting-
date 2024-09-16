const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateContent() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "My name is wahhiduzzaman suva, i read in aiub, imm the best of the best with cg4. i'mm so talented, i want earn lots of money. now write a short inspiring story on wahhiduzzaman suva";

    const result = await model.generateContent(prompt);
    console.log(await result.response.text());  // Wait for the response to be text
  } catch (error) {
    console.error("Error generating content:", error.message);
  }
}

generateContent();
