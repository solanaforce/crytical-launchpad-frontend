import { Flex } from "components/Box";
import styled from "styled-components";
import { Text } from "components/Text";
import Divider from "components/Divider";
import { NextLinkFromReactRouter } from "components/NextLink";
import { Agent } from "../types";

const StyledCard = styled(Flex)`
  background: #ffffff15;
  width: 100%;
  backdrop-filter: blur(25px);
  z-index: 1;
  padding: 20px;
  gap: 12px;
  flex-direction: column;
`

function AgentCard({
  agent
} : {
  agent: Agent
}) {
  return (
    <NextLinkFromReactRouter to={`/agents/${agent.id}`}>
      <StyledCard>
        <Flex style={{gap: "8px"}}>
          <Text fontSize={16}>{agent.name}</Text>
          <Flex
            borderRadius="4px"
            background="#6135b3"
            padding="4px"
            alignItems="center"
          >
            <Text fontSize={11}>Active</Text>
          </Flex>
        </Flex>
        <Flex>
          <Text>{agent.description}</Text>
        </Flex>
        <Divider />
        <Flex>
          <Text>Credits: 20</Text>
        </Flex>
      </StyledCard>
    </NextLinkFromReactRouter>
  )
}

export default AgentCard