import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { Loader } from "./components/Loader/Loader";

const GeneralRecipesPage = React.lazy(
  () => import("./pages/GeneralRecipesPage/GeneralRecipesPage")
);
const FavoriteRecipesPage = React.lazy(
  () => import("./pages/FavoriteRecipesPage/FavoriteRecipesPage")
);
const ProfilePage = React.lazy(() => import("./pages/ProfilePage/ProfilePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(
  () => import("./pages/RegisterPage/RegisterPage")
);
const Page404 = React.lazy(() => import("./pages/Page404/Page404"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<GeneralRecipesPage />} />
          <Route path="/favorite" element={<FavoriteRecipesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
