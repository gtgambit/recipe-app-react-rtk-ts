import { recipesApi } from "../../api/recipesApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipesApiResponse } from "../../types/types";

interface FetchRecipesParams {
  signal: AbortSignal;
}

export const fetchRecipes = createAsyncThunk<
  RecipesApiResponse,
  FetchRecipesParams,
  { rejectValue: string | Error }
>("recipes/fetchAll", async ({ signal }, { rejectWithValue }) => {
  try {
    return await recipesApi.getRecipesByLetter(signal);
  } catch (error) {
    if (signal.aborted) {
      return rejectWithValue("aborted");
    }
    if (error instanceof Error) {
      return rejectWithValue(error);
    }
    return rejectWithValue(new Error("Some error occurred"));
  }
});
