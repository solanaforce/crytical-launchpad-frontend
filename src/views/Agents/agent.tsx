import { useEffect, useState } from 'react'
import Page from 'Page'
import { Flex } from 'components/Box'
import { useMatchBreakpoints } from 'contexts'
import { getUserAgent } from 'api/Agents'
import { useAppKitAccount } from '@reown/appkit/react'
import AgentHeader from './components/AgentHeader'
import { AgentView } from './types'
import AgentSteps from './components/AgentSteps'
import TelegramForm from './components/TelegramForm'
import SocialForm from './components/SocialForm'
import BindTokenForm from './components/BindTokenForm'
import KnowledgeForm from './components/Knowledge'
import WebpageForm from './components/Webpage'
import EditPromptForm from './components/EditPrompt'
import ScenarioForm from './components/ScenarioForm'
import DiscordForm from './components/DiscordForm'

const Agent = ({id} : {id: string}) => {
  const { isDesktop } = useMatchBreakpoints()
  const [modalView, setModalView] = useState<AgentView>(AgentView.Telegram)

  const [time, setTime] = useState(Date.now())

  const { address, isConnected } = useAppKitAccount()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getUserAgent(id);
        setData(result.result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    if (!isConnected || !address)
      setData(null)
    if (isConnected && address) {
      getData()
    }
  }, [address, isConnected, time])

  if (!data || data.err) return null

  return (
    <Page>
      <AgentHeader
        agent={data}
        setModalView={setModalView}
      />
      <Flex
        flexDirection={isDesktop ? "row" : "column"}
        style={{gap: isDesktop ? "60px" : "0"}}
        justifyContent="space-between"
        mt="32px"
      >
      {(modalView === AgentView.Telegram) && <>
        <AgentSteps step={0} setModalView={setModalView} />
        <TelegramForm
          modalView={modalView}
          setModalView={setModalView}
          agent={data}
          setTime={setTime}
        />
      </>}
      {(modalView === AgentView.Discord) && <>
        <AgentSteps step={0} setModalView={setModalView} />
        <DiscordForm
          modalView={modalView}
          setModalView={setModalView}
        />
      </>}
      {(modalView === AgentView.Twitter || modalView === AgentView.Tiktok || modalView === AgentView.Twitch) && <>
        <AgentSteps step={1} setModalView={setModalView} />
        <SocialForm />
      </>}
      {(modalView === AgentView.BindToken || modalView === AgentView.CreateToken) && <>
        <AgentSteps step={2} setModalView={setModalView} />
        <BindTokenForm />
      </>}
      {(modalView === AgentView.Knowledge) && <>
        <AgentSteps step={3} setModalView={setModalView} />
        <KnowledgeForm
          modalView={modalView}
          setModalView={setModalView}
          setTime={setTime}
          agent={data}
        />
      </>}
      {(modalView === AgentView.Webpage) && <>
        <AgentSteps step={3} setModalView={setModalView} />
        <WebpageForm 
          modalView={modalView}
          setModalView={setModalView} 
          setTime={setTime}
          agent={data}
        />
      </>}
      {(modalView === AgentView.Prompt) && <>
        <AgentSteps step={4} setModalView={setModalView} />
        <EditPromptForm
          modalView={modalView}
          setModalView={setModalView}
          agent={data}
          setTime={setTime}
        />
      </>}
      {(modalView === AgentView.Scenario) && <>
        <AgentSteps step={4} setModalView={setModalView} />
        <ScenarioForm
          modalView={modalView}
          setModalView={setModalView}
        />
      </>}
      </Flex>
    </Page>
  )
}

export default Agent