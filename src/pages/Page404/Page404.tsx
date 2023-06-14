import { FC } from "react";
import Button from "@mui/material/Button/Button";

import s from "./Page404.module.scss";

const Page404: FC = () => {
  return (
    <div className={s.errorContainer}>
      <p className={s.error}>{`⚠ Error: Page Not Found`}</p>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => window.location?.reload()}>
        Reload
      </Button>
    </div>
  );
};

export default Page404;
