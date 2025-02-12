import { Box, Flex } from 'components/Box'
import Page from 'Page'
import { useMatchBreakpoints } from 'contexts'
import { AbsoluteBox, FlexLayout, ResponsiveGridHeader, TableWrapper } from './style'
import { SampleAgents } from './sample'
import { Text } from 'components/Text'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { ButtonMenu, ButtonMenuItem } from 'components/ButtonMenu'
import { useMemo, useState } from 'react'
import { Button } from 'components/Button'
import { getMcapString } from './utils'
import Divider from 'components/Divider'
import DataRow from './components/DataRow'

const Home: React.FC<React.PropsWithChildren> = () => {
  const { isDesktop, isMobile } = useMatchBreakpoints()
  const [modalView, setModalView] = useState(0)

  const ChosenByFilter = useMemo(() => {
    if (modalView === 0)
      return SampleAgents.sort((a, b) => b.mcap - a.mcap).slice()
    if (modalView === 1)
      return SampleAgents.sort((a, b) => b.created - a.created).slice()
    return SampleAgents.sort((a, b) => b.creditUsed - a.creditUsed).slice()
  }, [SampleAgents, modalView])

  return (
    <Page>
      {isDesktop && <FlexLayout>
        {SampleAgents.sort((a, b) => b.mcap - a.mcap).slice(0, 5).map((agent) => {
          return (
            <NextLinkFromReactRouter to={`/token/${agent.id}`} key={agent.id}>
              <Box position="relative">
                <img width="100%" src={agent.img} alt={agent.name} style={{borderRadius: "8px"}} />
                <AbsoluteBox>
                  <Text fontSize={18} bold>{agent.name}</Text>
                  <Text>Mcap: {getMcapString(agent.mcap)}</Text>
                </AbsoluteBox>
              </Box>
            </NextLinkFromReactRouter>
          )
        })}
      </FlexLayout>}
      {}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <ButtonMenu
          activeIndex={modalView} 
          scale="md"
          variant="secondary"
          onItemClick={(index) => setModalView(index)}
          fullWidth={isMobile}
        >
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "8px", 
            borderBottomLeftRadius: "8px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }}>
            Top
          </ButtonMenuItem>
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }}>
            New
          </ButtonMenuItem>
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
          }}>
            Most Used
          </ButtonMenuItem>
        </ButtonMenu>
        {!isMobile && <Button
          variant='primary'
          scale="md"
          height="42px"
        >
          View All
        </Button>}
      </Flex>
      <Flex
        justifyContent="space-between"
        style={{gap: "20px"}}
      >
        <Box width="100%">
          <TableWrapper>
            <ResponsiveGridHeader>
              <Text>#</Text>
              <Text>Agent</Text>
              <Text>Mcap</Text>
              <Text>Credits used</Text>
            </ResponsiveGridHeader>
          </TableWrapper>
          <Box width="100%" mt="8px">
            <Divider />
          </Box>
          {ChosenByFilter && ChosenByFilter.length > 0 && ChosenByFilter.slice(0, 5).map((agent, index) => {
            if (agent) {
              return (
                <DataRow agent={agent} id={index} key={agent.id} />
              )
            }
            return null
          })}
        </Box>
        {isDesktop && <Box width="100%">
          <TableWrapper width="100%">
            <ResponsiveGridHeader>
              <Text>#</Text>
              <Text>Agent</Text>
              <Text>Mcap</Text>
              <Text>Credits used</Text>
            </ResponsiveGridHeader>
          </TableWrapper>
          <Box width="100%" mt="8px">
            <Divider />
          </Box>
          {ChosenByFilter && ChosenByFilter.length > 0 && ChosenByFilter.slice(5, 10).map((agent, index) => {
            if (agent) {
              return (
                <DataRow agent={agent} id={index + 5} key={agent.id} />
              )
            }
            return null
          })}
        </Box>}
      </Flex>
    </Page>
  )
}

export default Home