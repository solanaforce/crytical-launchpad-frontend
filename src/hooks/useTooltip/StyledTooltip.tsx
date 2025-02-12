import styled from "styled-components";
import { m as Motion } from "framer-motion";

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: #371268;
  }
`;

export const StyledTooltip = styled(Motion.div)`
  padding: 12px;
  font-size: 12px;
  line-height: 130%;
  // border-radius: 12px;
  max-width: 320px;
  z-index: 5000;
  backdrop-filter: blur(20px);
  background: #371268;
  color: #ffffff;
  box-shadow: ${({ theme }) => theme.shadows.tooltip};

  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -4px;
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: -4px;
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: -4px;
  }
` as typeof Motion.div;
