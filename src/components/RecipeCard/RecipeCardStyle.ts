export const classes = {
  root: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      "& .MuiButtonBase-root": {
        visibility: "visible",
        opacity: 1,
        pointerEvents: "all",
      },
    },
  },
  media: {
    height: 250,
  },
  titleMain: {
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0.5rem auto",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: 0.6,
    marginBottom: 0.6,
  },
  favoriteBtn: {
    position: "absolute",
    bottom: 4,
    right: 35,
  },
  deleteBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
};
