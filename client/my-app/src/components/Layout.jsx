import { useState } from "react";
import axios from "axios";

const Layout = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleGenerateFlashcards = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/flashcards/generate",
        {
          text: "Artificial Intelligence is a field of computer science that aims to create intelligent machines.",
        }
      );
      setData(response.data.flashcards);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-800">
          AI Flashcard Generator
        </h1>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-[1.02] hover:shadow-lg transition"
          onClick={handleGenerateFlashcards}>
          Generate Flashcards
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-1">
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
