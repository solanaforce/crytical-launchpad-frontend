import { Flex } from "components/Box";
import styled from "styled-components";

export const FlexLayout = styled.div`
  display: grid;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

export const AbsoluteBox = styled(Flex)`
  background-color: #00000040;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 12px;
  backdrop-filter: blur(4px);
  width: 100%;
`

export const TableWrapper = styled(Flex)`
  padding-top: 16px;
  flex-direction: column;
`

export const ResponsiveGridHeader = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  height: 24px;

  grid-template-columns: 1fr 8fr 3fr 5fr;
`

export const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  margin: 16px 0;

  grid-template-columns: 1fr 8fr 3fr 5fr;
`