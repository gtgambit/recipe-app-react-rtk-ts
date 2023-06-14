import { useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useAppSelector } from "../../hooks/redux-hooks";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Loader } from "../../components/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";

import s from "./FavoriteRecipesPage.module.scss";

const FavoriteRecipesPage = () => {
  const { isLoading, error, favoriteRecipes } = useAppSelector(
    (state) => state.recipes
  );

  useEffect(() => {}, []);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <section>
      <div className={`container ${s.container}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container spacing={3}>
              {!favoriteRecipes.length && (
                <Typography variant="h6" sx={{ margin: "0 auto", mt: 4 }}>
                  Recipes not found
                </Typography>
              )}

              {favoriteRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.idMeal} />
              ))}
            </Grid>
          </>
        )}
      </div>
    </section>
  );
};

export default FavoriteRecipesPage;
