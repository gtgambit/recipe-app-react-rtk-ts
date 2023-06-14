import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchRecipes } from "../../store/recipes/recipesThunks";

import Page404 from "../Page404/Page404";

import s from "./GeneralRecipesPage.module.scss";
import { Loader } from "../../components/Loader/Loader";

const GeneralRecipesPage = () => {
  const dispatch = useAppDispatch();
  const { recipes, isLoading, error } = useAppSelector(
    (state) => state.recipes
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(() => {
    const searchQuery = searchParams.get("query");
    return searchQuery || "";
  });

  const abortConRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortConRef.current = new AbortController();
    dispatch(
      fetchRecipes({
        signal: abortConRef.current.signal,
      })
    );
    return () => {
      abortConRef?.current?.abort();
    };
  }, []);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target.value;
    setQuery(target);

    if (target) {
      searchParams.set("query", query.trim());
      setSearchParams(searchParams);
      return;
    }
    searchParams.delete("query");
    setSearchParams(searchParams);
  };

  if (error) {
    return <Page404 />;
  }

  return (
    <section>
      <div className={`container ${s.container}`}>
        <Input
          onChange={onChangeInput}
          value={query}
          startAdornment={<SearchIcon />}
          sx={{
            px: 1,
            mt: 1,
            mb: 4,
            gap: 1,
            width: 290,
          }}
          placeholder="Search recipe..."
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container spacing={3}>
              {!recipes.length && (
                <Typography variant="h6" sx={{ margin: "0 auto", mt: 4 }}>
                  Recipes not found
                </Typography>
              )}

              {recipes?.map((recipe) => (
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
