import styled, { css, keyframes } from "styled-components";
import { space } from "styled-system";
import { SvgProps } from "./types";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;

const Svg = styled("svg").withConfig({
  shouldForwardProp: (p) => !["spin"].includes(p),
})<SvgProps>`
  align-self: center; // Safari fix
  fill: ${({ color }) => color};
  color: ${({ color }) => color};
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle};
  ${space};

  // Safari fix
  @supports (-webkit-text-size-adjust: none) and (not (-ms-accelerator: true)) and (not (-moz-appearance: none)) {
    filter: none !important;
  }
`;

Svg.defaultProps = {
  color: "#000000",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
  spin: false,
};

export default Svg;
