import { fetchTriviaQuestions } from "../services/triviaService.js";

export const getQuizQuestions = async (req, res) => {
  try {
    const { amount, category, difficulty } = req.query;
    const questions = await fetchTriviaQuestions(
      amount || 15,
      category,
      difficulty
    );
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
