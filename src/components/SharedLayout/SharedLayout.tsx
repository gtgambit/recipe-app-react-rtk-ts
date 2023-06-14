import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Loader } from "../../components/Loader/Loader";

const SharedLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export { SharedLayout };
