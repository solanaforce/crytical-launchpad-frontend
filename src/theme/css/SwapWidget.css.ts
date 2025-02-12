import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "./atoms";
import { responsiveStyle } from "./responsiveStyle";

export const switchButtonClass = style([
  atoms({}),
  style({
    backgroundColor: "primary",
    boxShadow: "inset 0px -2px 0px rgba(0, 0, 0, 0.1)",
    borderRadius: "25px !important",
  }),
]);

export const iconDownClass = style({
  selectors: {
    [`${switchButtonClass}:hover &`]: {
      display: "none",
      fill: "white",
    },
  },
});

export const iconUpDownClass = style({
  display: "none",
  selectors: {
    [`${switchButtonClass}:hover &`]: {
      display: "block",
      fill: "white",
    },
  },
});

export const inputVariants = recipe({
  base: {
    width: 0,
    position: "relative",
    fontWeight: 500,
    outline: "none",
    border: "none",
    flex: "1 1 auto",
    backgroundColor: "transparent",
    fontSize: 16,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 0,
    WebkitAppearance: "textfield",
    color: "#ffffff",
    selectors: {
      "&::-webkit-search-decoration": {
        WebkitAppearance: "none",
      },
      '&[type="number"]': {
        MozAppearance: "textfield",
      },
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
      },
      "&::placeholder": {
        color: "#d6d6d685",
      },
    },
  },
  variants: {
    error: {
      true: {
        color: "#ED4B9E",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
  },
  defaultVariants: {
    align: "right",
    error: false,
  },
});

export const inputRowVariants = recipe({
  base: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  variants: {
    selected: {
      true: {
        padding: "0.75rem 0.5rem 0.75rem 1rem",
      },
      false: {
        padding: "0.75rem 0.75rem 0.75rem 1rem",
      },
    },
  },
});

export const inputContainerVariants = recipe({
  base: style([
    atoms({
      borderRadius: "default",
      backgroundColor: "input",
    }),
  ]),
  variants: {
    error: {
      true: atoms({
        boxShadow: "danger",
      }),
      false: atoms({
        boxShadow: "inset",
      }),
    },
    showBridgeWarning: {
      true: atoms({
        boxShadow: "warning",
      }),
    },
  },
});

export const pageVariants = recipe({
  base: style([
    atoms({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      // marginBottom: "64px",
      // minHeight: "100vh",
      // background: "gradientBakcground",
      // padding: "16px",
      paddingBottom: "0px",
    }),
    style({
      backgroundSize: "auto",
    }),
    responsiveStyle({
      xs: {
        paddingTop: "24px",
        paddingBottom: "0",
      },
      sm: {
        padding: "24px",
        paddingBottom: "0",
      },
      lg: {
        padding: "32px",
        paddingBottom: "0",
      },
    }),
  ]),
  variants: {
    removePadding: {
      true: {
        padding: "0!important",
      },
    },
    noMinHeight: {
      true: responsiveStyle({
        xs: {
          minHeight: "initial!important",
        },
      }),
    },
  },
});

export const balanceMaxMiniClass = style([
  atoms({
    backgroundColor: "background",
    borderRadius: "circle",
    cursor: "pointer",
    color: "text",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  style({
    padding: "0.2rem",
    fontSize: "0.875rem",
    border: "none",
    height: "22px",
    width: "22px",
    fontWeight: 400,
    marginLeft: "0.4rem",
    float: "right",
    selectors: {
      "&:hover": {
        backgroundColor: "#ffffff10",
      },
      "&:focus": {
        backgroundColor: "#ffffff10",
        outline: "none",
      },
    },
  }),
]);
