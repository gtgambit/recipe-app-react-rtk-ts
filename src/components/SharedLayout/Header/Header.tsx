import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux-hooks";
import Button from "@mui/material/Button/Button";
import logo from "./../../../assets/logo.png";
import s from "./Header.module.scss";

const Header = () => {
  const token = useAppSelector((state: any) => state.auth.token);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to="/" className={s.logoLink}>
          <img src={logo} alt="brand logo" width={30} height={30} />
          <span>Recipes</span>
        </NavLink>

        <nav>
          <ul className={s.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ""}`
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorite"
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ""}`
                }>
                Favorite Recipes
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={s.rightSide}>
          {token ? (
            <Button sx={{ p: 0 }} variant="outlined">
              <NavLink to="/profile" className={s.profileLink}></NavLink>
            </Button>
          ) : (
            <Button sx={{ p: 0 }} variant="outlined">
              <NavLink to="/login" className={s.loginLink}>
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
