import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getFlashcardsFromOpenAI = async (text) => {
  const prompt = `Create multiples of 3 no. of study flashcards from the following text. Each flashcard should be in JSON format with "question" and "answer".
  Text: ${text}
  Example output:
  [
    {"question": "What is photosynthesis?", "answer": "The process by which plants make food using sunlight, water, and CO2."},
    {"question": "Which gas is required?", "answer": "Carbon dioxide (CO2)."}
  ]
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    message: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  let flashcards = [];
  try {
    flashcards = JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log("Error parsing the OpenAI response", error);
    throw new Error("Failed to parse the AI response");
  }
  return flashcards;
};
