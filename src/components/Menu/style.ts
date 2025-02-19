import { Box, Flex } from "components/Box";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

export const StyledLink = styled.a`
  display: flex;
  .mobile-icon {
    width: 26px;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: block;
    }
  }
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    div {
      color: #d0b6ff;
    }
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`

export const FixedContainer = styled("div").withConfig({
  shouldForwardProp: (props) => !["showMenu"].includes(props),
})<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  transform: translate3d(0, 0, 0);

  background: #120325;

  padding-left: 24px;
  padding-right: 24px;
`

export const MenuItem = styled.a<{$isActive?: boolean;}>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#9b65ff")};
  font-size: 16px;

  padding: 0 16px;
  height: 48px;

  &:hover {
    color: #ffffff;
    border-radius: 8px;
  }
`

export const SearchBox = styled(Flex)`
  // border: 1px solid #868686;
  background: #ffffff10;
  border-radius: 4px;
  padding-left: 12px;
  height: 40px;
`

export const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
  justify-content: center;
`;