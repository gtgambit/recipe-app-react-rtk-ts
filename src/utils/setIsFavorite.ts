import { Recipe } from "../types/types";

export const setIsFavorite = (recipes: Recipe[], favorites: Recipe[]) => {
  const favoritesSet = new Set<string>();

  favorites.forEach((recipe) => {
    favoritesSet.add(recipe.idMeal);
  });

  return recipes.map((recipe) => {
    const isFavorite = favoritesSet.has(recipe.idMeal);
    return { ...recipe, isFavorite };
  });
};
