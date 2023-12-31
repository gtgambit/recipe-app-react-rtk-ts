import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useAppSelector } from "../../hooks/redux-hooks";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Page404 from "../Page404/Page404";
import { Loader } from "../../components/Loader/Loader";
import { Recipe } from "../../types/types";

import style from "./FavoriteRecipesPage.module.scss";

const FavoriteRecipesPage = () => {
  const { isLoading, error, favoriteRecipes } = useAppSelector(
    (state) => state.recipes
  );
  const { token } = useAppSelector((state) => state.auth);

  if (error) {
    return <Page404 />;
  }

  return (
    <section>
      <div className={`container ${style.container}`}>
        {token ? (
          <Typography variant="h5" className={style.mainTitle}>
            Favorite Recipes
          </Typography>
        ) : (
          ""
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {token ? (
              <Grid container spacing={3}>
                {!favoriteRecipes.length && (
                  <Typography variant="h6" sx={{ margin: "0 auto", mt: 4 }}>
                    Recipes not found
                  </Typography>
                )}

                {favoriteRecipes.map((recipe: Recipe) => (
                  <RecipeCard recipe={recipe} key={recipe.idMeal} />
                ))}
              </Grid>
            ) : (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "36px",
                  textAlign: "center",
                  margin: "0 auto",
                }}>
                Sign in <br />
                to access favorite recipes
              </Typography>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FavoriteRecipesPage;
