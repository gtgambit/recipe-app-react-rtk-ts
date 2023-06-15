import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipes } from "./recipesThunks";
import { setIsFavorite } from "../../utils/setIsFavorite";
import { addRecipe, removeRecipe } from "../../utils/toggleFavoriteRecipe";
import { Recipe } from "../../types/types";

interface InitialState {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: InitialState = {
  recipes: [],
  favoriteRecipes: [],
  isLoading: false,
  error: null,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
    toggleIsFavorite: (state, action: PayloadAction<Recipe>) => {
      const { idMeal } = action.payload;
      state.recipes = state.recipes.map((recipe) =>
        recipe.idMeal === idMeal
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      );
      const isExist = state.favoriteRecipes.find(
        (recipe) => recipe.idMeal === idMeal
      );
      state.favoriteRecipes = isExist
        ? removeRecipe(idMeal, state.favoriteRecipes)
        : addRecipe(action.payload, state.favoriteRecipes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = setIsFavorite(
          action.payload?.meals,
          state.favoriteRecipes
        );
        state.isLoading = false;
      })
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  },
});

export const { deleteRecipe, toggleIsFavorite } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
