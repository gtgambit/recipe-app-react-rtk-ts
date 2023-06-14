import { createPortal } from "react-dom";
import { Discuss } from "react-loader-spinner";

export const Loader = (): JSX.Element => {
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}>
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
