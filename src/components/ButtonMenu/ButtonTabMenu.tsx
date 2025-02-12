import styled from "styled-components";
import ButtonMenu from "./ButtonMenu";
import ButtonMenuItem from "./ButtonMenuItem";

const Wrapper = styled.div`
  & > div {
    width: 100%;
    background-color: #ffffff15;
    border: 0;
  }
  & button {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &:hover {
    background-color: #ffffff15;
    border-radius: 20px 20px 0 0;
  }
`;

interface ButtonTabMenuProps {
  activeIndex: number;
  itemList: string[];
  onItemClick: (index: number) => void;
}

const ButtonTabMenu: React.FC<React.PropsWithChildren<ButtonTabMenuProps>> = ({
  activeIndex,
  itemList,
  onItemClick,
}) => {
  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} onItemClick={onItemClick}>
        {itemList.map((content, idx) => (
          <ButtonMenuItem
            key={content}
            style={{
              color: idx === activeIndex ? "#ffffff" : "#ffffffaa",
              backgroundColor: idx === activeIndex ? "#ffffff10" : "#ffffff",
            }}
          >
            {content}
          </ButtonMenuItem>
        ))}
      </ButtonMenu>
    </Wrapper>
  );
};

export default ButtonTabMenu;
