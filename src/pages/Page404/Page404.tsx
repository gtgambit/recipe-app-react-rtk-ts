import { FC } from "react";
import { NavLink } from "react-router-dom";

import Button from "@mui/material/Button/Button";

import style from "./Page404.module.scss";

const Page404: FC = () => {
  return (
    <div className={style.errorContainer}>
      <p className={style.error}>{`⚠ Error: Page Not Found`}</p>
      <NavLink to="/">
        <Button variant="contained" sx={{ mt: 4 }}>
          Back to Home
        </Button>
      </NavLink>
    </div>
  );
};

export default Page404;
