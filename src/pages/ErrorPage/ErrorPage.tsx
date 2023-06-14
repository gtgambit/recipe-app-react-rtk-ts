import { FC } from "react";
import Button from "@mui/material/Button/Button";

import s from "./ErrorPage.module.scss";

interface ErrorPageProps {
  error: Error;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <div className={s.errorContainer}>
      <p className={s.error}>{`⚠ Error: ${error.message}`}</p>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => window.location?.reload()}>
        Reload
      </Button>
    </div>
  );
};

export default ErrorPage;
