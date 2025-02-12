import styled from "styled-components";
import { CheckboxProps, scales } from "./types";

const getScale = ({ scale }: CheckboxProps) => {
  switch (scale) {
    case scales.XS:
      return "16px";
    case scales.SM:
      return "20px";
    case scales.MD:
    default:
      return "32px";
  }
};

const Checkbox = styled.input.attrs({ type: "checkbox" })<CheckboxProps>`
  appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: ${getScale};
  width: ${getScale};
  min-height: ${getScale};
  min-width: ${getScale};
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 2px solid #ffffff27;
  border-radius: 4px;
  margin: 0;

  &:after {
    content: "";
    position: absolute;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-color: transparent;
    top: 30%;
    left: 0;
    right: 0;
    width: 50%;
    height: 25%;
    margin: auto;
    transform: rotate(-50deg);
    transition: border-color 0.2s ease-in-out;
  }

  &:checked {
    border: 0;
    background-color: #6135b3;
    &:after {
      border-color: white;
    }
  }

  &:disabled {
    border: 0;
    cursor: default;
    opacity: 0.6;
  }
`;

Checkbox.defaultProps = {
  scale: scales.MD,
};

export default Checkbox;
