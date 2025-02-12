import Page from 'Page'
import { Flex } from 'components/Box'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { NextLinkFromReactRouter } from 'components/NextLink'
import AgentCard from './components/AgentCard'
import { SampleAgents } from './sample'

const FlexLayout = styled.div`
  display: grid;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 1620px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
`;

const Agents: React.FC<React.PropsWithChildren> = () => {
  return (
    <Page>
      <Flex mb="20px">
        <Button
          as={NextLinkFromReactRouter}
          to="/agents/create"
          variant='primary'
          scale="md"
        >
          + Create Agent
        </Button>
      </Flex>
      <FlexLayout>
        {SampleAgents && SampleAgents.length > 0 && SampleAgents.map((agent) => {
          return <AgentCard
            key={agent.id}
            agent={agent}
          />
        })}
      </FlexLayout>
    </Page>
  )
}

export default Agents