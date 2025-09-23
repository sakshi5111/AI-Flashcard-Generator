import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flashcardRoutes from "./src/routes/flashcardRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/flashcards", flashcardRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
