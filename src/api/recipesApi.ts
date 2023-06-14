import axios, { AxiosRequestConfig } from "axios";
import { RecipesApiResponse } from "../types/types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

export const recipesApi = {
  async getRecipesByLetter(signal?: AbortSignal) {
    const config: AxiosRequestConfig = { signal };
    let { data } = await axios.get<RecipesApiResponse>(`${BASE_URL}`, config);
    return data;
  },
};
