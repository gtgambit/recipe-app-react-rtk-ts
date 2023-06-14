import recipeCard from "../assets/recipeCard.jpg";

export const handleImageError = (e: React.BaseSyntheticEvent) => {
  e.target.onerror = null;
  e.target.src = recipeCard;
};
