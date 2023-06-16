import { Grid, Typography } from "@mui/material";

import style from "./Footer.module.scss";

const Footer = (): JSX.Element => {
  return (
    <footer>
      <Grid container className={style.footer} justifyContent="center">
        <Grid item>
          <Typography variant="body1" align="center">
            &copy; Recipes Manager App - Built Using React, Redux Toolkit, and
            Typescript
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export { Footer };
