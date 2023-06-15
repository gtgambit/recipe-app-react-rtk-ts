import { recipesApi } from "../../api/recipesApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipesApiResponse } from "../../types/types";

export const fetchRecipes = createAsyncThunk<
  RecipesApiResponse,
  undefined,
  { rejectValue: string | Error }
>("recipes/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await recipesApi.getRecipesByLetter();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error);
    }
    return rejectWithValue(new Error("Some error occurred"));
  }
});
