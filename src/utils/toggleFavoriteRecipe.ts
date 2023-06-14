import { Recipe } from "../types/types";

export const addRecipe = (recipe: Recipe, favorites: Recipe[]) => {
  return [{ ...recipe, isFavorite: true }, ...favorites];
};
export const removeRecipe = (id: string, favorites: Recipe[]) => {
  return favorites.filter((recipe) => recipe.idMeal !== id);
};
