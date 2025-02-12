import styled, { DefaultTheme } from "styled-components";
import { InputProps, scales } from "./types";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "36px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const Input = styled("input").withConfig({
  shouldForwardProp: (props) => !["scale", "isSuccess", "isWarning"].includes(props),
})<InputProps>`
  background-color: #ffffff10;
  border: none;
  color: #ffffff;
  display: block;
  font-size: 14px;
  height: ${getHeight};
  outline: 0;
  width: 100%;
  border-radius: 4px;

  padding: 10px 12px;

  &::placeholder {
    color: #939393;
  }

  &:disabled {
    background-color: #707070;
    box-shadow: none;
    color: #939393;
    cursor: not-allowed;
  }
`;

Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
};

export default Input;
