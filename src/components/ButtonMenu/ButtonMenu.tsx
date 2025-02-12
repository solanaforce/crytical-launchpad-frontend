import React, { cloneElement, Children, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme;
}

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: ${({variant}) => variant === variants.SECONDARY ? "transparent" : "#ffffff55"};
  // border-radius: 4px;
  display: ${({ fullWidth }) => (fullWidth ? "flex" : "inline-flex")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  & > button,
  & > a {
    flex: ${({ fullWidth }) => (fullWidth ? 1 : "auto")};
  }

  & > button + button,
  // & > a + a {
  //   margin-left: 2px; // To avoid focus shadow overlap
  // }

  & > button,
  & a {
    box-shadow: none;
  }

  ${({ disabled, variant }) => {
    if (disabled) {
      return `
        opacity: 0.5;

        & > button:disabled {
          background-color: transparent;
          color: ${variant === variants.SECONDARY ? "#6135b3" : "#ffffff"};
        }
    `;
    }
    return "";
  }}
  ${space}
`;

const ButtonMenu: React.FC<React.PropsWithChildren<ButtonMenuProps>> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.SECONDARY,
  onItemClick,
  disabled,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButtonMenu disabled={disabled} variant={variant} fullWidth={fullWidth} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: true,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant: activeIndex === index ? "primary" : "secondary",
          disabled,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
