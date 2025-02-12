import { useState } from 'react'
import Page from 'Page'
import { Flex } from 'components/Box'
import { useMatchBreakpoints } from 'contexts'
import AgentHeader from './components/AgentHeader'
import { AgentView } from './types'
import { SampleAgents } from './sample'
import AgentSteps from './components/AgentSteps'
import ChatForm from './components/ChatForm'
import SocialForm from './components/SocialForm'
import BindTokenForm from './components/BindTokenForm'
import KnowledgeForm from './components/Knowledge'
import WebpageForm from './components/Webpage'
import EditPromptForm from './components/EditPrompt'
import ScenarioForm from './components/ScenarioForm'

const Agent = ({id} : {id: string}) => {
  const { isDesktop } = useMatchBreakpoints()
  const [modalView, setModalView] = useState<AgentView>(AgentView.Telegram)
  const agent = SampleAgents.find((s) => s.id === id)

  if (!agent) return null
  return (
    <Page>
      <AgentHeader
        name={agent.name}
        src={agent.src}
        isVerified={agent.isVerified}
        telegram={agent.telegram}
        discord={agent.discord}
        twitter={agent.twitter}
        token={agent.token}
        setModalView={setModalView}
      />
      <Flex
        flexDirection={isDesktop ? "row" : "column"}
        style={{gap: isDesktop ? "60px" : "0"}}
        justifyContent="space-between"
        mt="32px"
      >
      {(modalView === AgentView.Telegram || modalView === AgentView.Discord) && <>
        <AgentSteps step={0} setModalView={setModalView} />
        <ChatForm
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
        />
      </>}
      {(modalView === AgentView.Webpage) && <>
        <AgentSteps step={3} setModalView={setModalView} />
        <WebpageForm 
          modalView={modalView}
          setModalView={setModalView} 
        />
      </>}
      {(modalView === AgentView.Prompt) && <>
        <AgentSteps step={4} setModalView={setModalView} />
        <EditPromptForm
          modalView={modalView}
          setModalView={setModalView}
          agent={agent}
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