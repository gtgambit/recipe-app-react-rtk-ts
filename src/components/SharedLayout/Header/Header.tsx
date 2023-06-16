import { NavLink } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux-hooks";
import Button from "@mui/material/Button/Button";

import style from "./Header.module.scss";

import logo from "./../../../assets/logo.png";

const Header = () => {
  const token = useAppSelector((state: any) => state.auth.token);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <NavLink to="/" className={style.logoLink}>
          <img src={logo} alt="brand logo" width={30} height={30} />
          <span>Recipes</span>
        </NavLink>

        <nav>
          <ul className={style.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.linkActive : ""}`
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorite"
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.linkActive : ""}`
                }>
                Favorite
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={style.rightSide}>
          {token ? (
            <Button sx={{ p: 0 }} variant="outlined">
              <NavLink to="/profile" className={style.profileLink}></NavLink>
            </Button>
          ) : (
            <Button sx={{ p: 0 }} variant="outlined">
              <NavLink to="/login" className={style.loginLink}>
                Sign In
              </NavLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
