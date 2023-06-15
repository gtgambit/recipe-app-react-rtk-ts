import axios from "axios";
import { RecipesApiResponse } from "../types/types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export const recipesApi = {
  async getRecipesByLetter() {
    const { data } = await axios.get<RecipesApiResponse>(`${BASE_URL}?f=b`);
    return data;
  },
};
