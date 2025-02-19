import Page from 'Page'
import { Flex } from 'components/Box'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useAppKitAccount } from '@reown/appkit/react'
import { getUserAgents } from 'api/Agents'
import { useEffect, useState } from 'react'
import AgentCard from './components/AgentCard'

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

  const { address, caipAddress, isConnected } = useAppKitAccount()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getUserAgents();
        setData(result.result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    setData(null)
    if (isConnected && address) {
      getData()
    }
  }, [address, isConnected])

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
        {!loading && data && data.length > 0 && data.map((agent) => {
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