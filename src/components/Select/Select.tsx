import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Box, BoxProps } from "../Box";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../Svg";
import { Text } from "../Text";

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  // border: 1px solid #bc92ff;
  border-radius: 4px;
  background: #ffffff10;
  transition: border-radius 0.15s;
`;

const DropDownListContainer = styled.div`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #ffffff10;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  backdrop-filter: blur(20px);
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
`;

const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: transparent;
  border-radius: 4px;
  height: 40px;
  min-width: 136px;
  user-select: none;
  z-index: 20;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        // border-bottom: 1px solid #2d0e5f;
        box-shadow: ${({ theme }) => theme.shadows.tooltip};
        // border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        // border: 1px solid #2d0e5f;
        border-top-width: 0;
        // border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.shadows.tooltip};
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`;

const ListItem = styled.li`
  list-style: none;
  padding: 10px 16px;
  &:hover {
    background: #2d0e5f15;
  }
`;

export interface SelectProps extends BoxProps {
  options: OptionProps[];
  onOptionChange?: (option: OptionProps) => void;
  placeHolderText?: string;
  defaultOptionIndex?: number;
}

export interface OptionProps {
  label: string;
  value: any;
}

const Select: React.FunctionComponent<React.PropsWithChildren<SelectProps>> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  placeHolderText,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex);

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex);
    setIsOpen(false);
    setOptionSelected(true);

    if (onOptionChange) {
      onOptionChange(options[selectedIndex]);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultOptionIndex) {
      setSelectedOptionIndex(defaultOptionIndex - 1);
      setOptionSelected(true);
    }
  }, [defaultOptionIndex]);

  return (
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <Text color={!optionSelected && placeHolderText ? "text" : undefined}>
          {!optionSelected && placeHolderText ? placeHolderText : options[selectedOptionIndex].label}
        </Text>
      </DropDownHeader>
      {!isOpen && <ArrowDropDownIcon color="#ffffff" onClick={toggling} />}
      {isOpen && <ArrowDropUpIcon color="#ffffff" onClick={toggling} />}
      <DropDownListContainer>
        <DropDownList>
          {options.map((option, index) =>
            placeHolderText || index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  );
};

export default Select;
