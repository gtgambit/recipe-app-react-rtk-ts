import { Recipe, RecipesApiResponse } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipes } from "./recipesThunks";
import { setIsFavorite } from "../../utils/setIsFavorite";
import { addRecipe, removeRecipe } from "../../utils/toggleFavoriteRecipe";

interface InitialState {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  isLoading: boolean;
  error: null | Error;
  filter: string;
}

const initialState: InitialState = {
  recipes: [],
  favoriteRecipes: [],
  isLoading: false,
  error: null,
  filter: "",
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, { payload }: PayloadAction<RecipesApiResponse>) {
      const recipes = setIsFavorite(payload.meals, state.favoriteRecipes);
      state.recipes = recipes;
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
    toggleIsFavorite(state, action: PayloadAction<Recipe>) {
      state.recipes = state.recipes.map((recipe) => {
        return recipe.idMeal === action.payload.idMeal
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe;
      });
      const isExist = state.favoriteRecipes.find(
        (recipe) => recipe.idMeal === action.payload.idMeal
      );
      state.favoriteRecipes = isExist
        ? removeRecipe(action.payload.idMeal, state.favoriteRecipes)
        : addRecipe(action.payload, state.favoriteRecipes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload?.meals;
        state.isLoading = false;
      })
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        if (action.payload === "aborted") {
          return;
        }
        if (action.payload instanceof Error) {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  },
});

export const { deleteRecipe, toggleIsFavorite } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
