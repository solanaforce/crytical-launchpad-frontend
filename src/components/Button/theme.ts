import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "#6135b3",
    color: "#ffffff",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: "#6135b3",
    color: "#6135b3",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "#03FEFF",
    boxShadow: "none",
  }
};
