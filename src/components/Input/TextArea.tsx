import styled, { DefaultTheme } from "styled-components";
import { InputProps, scales } from "./types";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "100px";
    case scales.LG:
      return "250px";
    case scales.MD:
    default:
      return "150px";
  }
};

const TextArea = styled.textarea<InputProps>`
  background-color: #ffffff10;
  color: #ffffff;
  display: block;
  font-size: 14px;
  height: ${getHeight};
  outline: 0;
  padding: 10px 12px;
  width: 100%;
  border: none;
  border-radius: 4px;
  resize: vertical;

  &::placeholder {
    color: #d6d6d685;
  }

  &:disabled {
    background-color: #E9EAEB;
    box-shadow: none;
    color: #BDC2C4;
    cursor: not-allowed;
  }
`;

TextArea.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
};

export default TextArea;
