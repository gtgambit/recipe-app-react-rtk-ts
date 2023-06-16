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
      <Card
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        {token ? (
          <Typography
            variant="body1"
            component="p"
            sx={{
              alignItems: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "0.5rem auto",
            }}>
            {recipe.strMeal}
          </Typography>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "red",
              margin: "0 auto",
              marginBottom: "5px",
            }}>
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
            alt={title}
            onError={handleImageError}
            sx={{
              height: "250px",
            }}
          />
          <CardContent>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "0.6rem",
                marginBottom: "0.6rem",
              }}>
              {title}
            </Typography>
          </CardContent>
        </Link>
        {token ? (
          <>
            <IconButton
              aria-label="star"
              onClick={onClickToggleIsFavorite}
              sx={{
                position: "absolute",
                bottom: "4px",
                right: "35px",
              }}>
              <Star sx={{ fill: recipe.isFavorite ? "gold" : "white" }} />
            </IconButton>
            {isFavoritePage ? (
              ""
            ) : (
              <IconButton
                aria-label="delete"
                onClick={onClickDeleteRecipe}
                sx={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                }}>
                <DeleteIcon />
              </IconButton>
            )}
          </>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "red",
              margin: "0 auto",
              marginBottom: "5px",
            }}>
            Sign in to access all functionality
          </Typography>
        )}
      </Card>
    </Grid>
  );
};

export default RecipeCard;
