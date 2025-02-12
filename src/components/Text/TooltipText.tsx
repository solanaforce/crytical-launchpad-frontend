import styled from "styled-components";
import Text from "./Text";

const TooltipText = styled(Text)<{ decorationColor?: string }>`
  text-decoration: underline dotted;
  text-decoration-color: #d6d6d685;
  text-underline-offset: 0.1em;
`;

export default TooltipText;
