import { createPortal } from "react-dom";
import { Discuss } from "react-loader-spinner";

import style from "./Loader.module.scss";

export const Loader = (): JSX.Element => {
  return createPortal(
    <div className={style.loader}>
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="discuss-loading"
        wrapperStyle={{}}
      />
    </div>,
    document.body
  );
};
