import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";

import Page404 from "../Page404/Page404";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchRecipes } from "../../store/recipes/recipesThunks";

import { Loader } from "../../components/Loader/Loader";
import { Recipe } from "../../types/types";

import style from "./GeneralRecipesPage.module.scss";

const filterMealsByNameOrLetter = (recipes: Recipe[], inputValue: string) => {
  return recipes.filter((recipe) => {
    const recipeName = recipe.strMeal.toLowerCase();
    const filterValue = inputValue.toLowerCase();
    return recipeName.includes(filterValue);
  });
};

const GeneralRecipesPage = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);

  const { recipes, isLoading, error } = useAppSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const onSubmit = () => {
    const filteredRecipes = filterMealsByNameOrLetter(recipes, inputValue);
    setFilteredRecipeList(filteredRecipes);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  if (error) {
    return <Page404 />;
  }

  const showRecipes =
    filteredRecipeList.length > 0 ? filteredRecipeList : recipes;
  const recipesNotFound = !recipes.length && !filteredRecipeList.length;

  return (
    <section>
      <div className={`container ${style.container}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            onChange={handleChange}
            value={inputValue}
            startAdornment={<SearchIcon />}
            sx={{
              px: 1,
              mt: 1,
              mb: 1,
              gap: 1,
              width: 160,
            }}
            placeholder="Search recipe..."
          />
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{ ml: 1, padding: 0.7 }}>
            Submit
          </Button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container spacing={3}>
              {recipesNotFound && (
                <Typography variant="h6" sx={{ margin: "0 auto", mt: 4 }}>
                  Recipes not found
                </Typography>
              )}

              {showRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.idMeal} />
              ))}
            </Grid>
          </>
        )}
      </div>
    </section>
  );
};

export default GeneralRecipesPage;
