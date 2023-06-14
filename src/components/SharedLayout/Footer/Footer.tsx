import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.copyright}>
        &copy; Recipes Manager App - Built Using React, Redux Toolkit, and
        Typescript
      </p>
    </footer>
  );
};

export { Footer };
