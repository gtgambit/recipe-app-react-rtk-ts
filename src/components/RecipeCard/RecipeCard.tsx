import React, { FC } from "react";
import { Grid, IconButton } from "@mui/material";
import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../../hooks/redux-hooks";
import {
  deleteRecipe,
  toggleIsFavorite,
} from "../../store/recipes/recipesSlice";

import { handleImageError } from "../../utils/imageErrorHandler";
import { Recipe } from "../../types/types";

import { classes } from "./RecipeCardStyle";

import Star from "@mui/icons-material/Star";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useAppDispatch();

  const onClickToggleIsFavorite = () => {
    dispatch(toggleIsFavorite(recipe));
  };

  const onClickDeleteRecipe: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    dispatch(deleteRecipe(recipe.idMeal));
  };

  const title =
    recipe.strInstructions.length > 60
      ? `${recipe.strInstructions.slice(0, 60)}...`
      : recipe.strInstructions;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={classes.root}>
        <Typography variant="body1" component="p" sx={classes.titleMain}>
          {recipe.strMeal}
        </Typography>

        <Link
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer nofollow">
          <CardMedia
            component="img"
            src={recipe.strMealThumb}
            loading="lazy"
            sx={classes.media}
            alt={title}
            onError={handleImageError}
          />
          <CardContent>
            <Typography variant="body1" component="p" sx={classes.title}>
              {title}
            </Typography>
          </CardContent>
        </Link>
        <IconButton
          aria-label="star"
          sx={classes.favoriteBtn}
          onClick={onClickToggleIsFavorite}>
          <Star sx={{ fill: recipe.isFavorite ? "gold" : "white" }} />
        </IconButton>
        {
          <IconButton
            aria-label="delete"
            sx={classes.deleteBtn}
            onClick={onClickDeleteRecipe}>
            <DeleteIcon />
          </IconButton>
        }
      </Card>
    </Grid>
  );
};

export default React.memo(RecipeCard);
