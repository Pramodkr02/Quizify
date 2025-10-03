import axios from "axios";

const BASE_URL = "https://opentdb.com/api.php";

export const fetchTriviaQuestions = async (
  amount = 15,
  category,
  difficulty
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { amount, category, difficulty, type: "multiple" },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch trivia questions");
  }
};
