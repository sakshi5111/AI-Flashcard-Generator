import { getFlashcardsFromOpenAI } from "../services/openaiService.js";

export const generateFlashcards = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const flashcards = await getFlashcardsFromOpenAI(text);

    res.status(200).json({
      success: true,
      flashcards,
    });
  } catch (error) {
    console.log("Error in generateFlashcards : ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
