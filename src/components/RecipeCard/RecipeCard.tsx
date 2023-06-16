import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  deleteRecipe,
  toggleIsFavorite,
} from "../../store/recipes/recipesSlice";
import { handleImageError } from "../../utils/imageErrorHandler";
import { Recipe } from "../../types/types";

import style from "./RecipeCart.module.scss";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  const onClickToggleIsFavorite = () => {
    dispatch(toggleIsFavorite(recipe));
  };

  const onClickDeleteRecipe: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();
    dispatch(deleteRecipe(recipe.idMeal));
  };

  const title =
    recipe.strInstructions.length > 60
      ? `${recipe.strInstructions.slice(0, 60)}...`
      : recipe.strInstructions;

  const isFavoritePage = location.pathname.includes("/favorite");

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={style.cardContainer}>
        {token ? (
          <Typography
            variant="body1"
            component="p"
            className={style.cardTitleMain}>
            {recipe.strMeal}
          </Typography>
        ) : (
          <Typography className={style.signInText}>
            Sign in to access Recipe title
          </Typography>
        )}
        <Link
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer nofollow">
          <CardMedia
            component="img"
            src={recipe.strMealThumb}
            loading="lazy"
            className={style.media}
            alt={title}
            onError={handleImageError}
          />
          <CardContent className={style.cardContent}>
            <Typography variant="body1" component="p" className={style.title}>
              {title}
            </Typography>
          </CardContent>
        </Link>
        {token ? (
          <>
            <IconButton
              aria-label="star"
              className={style.favoriteBtn}
              onClick={onClickToggleIsFavorite}>
              <Star className={recipe.isFavorite ? style.favorite : ""} />
            </IconButton>
            {isFavoritePage ? (
              ""
            ) : (
              <IconButton
                aria-label="delete"
                className={style.deleteBtn}
                onClick={onClickDeleteRecipe}>
                <DeleteIcon />
              </IconButton>
            )}
          </>
        ) : (
          <Typography className={style.signInText}>
            Sign in to access all functionality
          </Typography>
        )}
      </Card>
    </Grid>
  );
};

export default RecipeCard;
