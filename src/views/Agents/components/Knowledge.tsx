import { Dispatch, SetStateAction, useState } from "react"
import { Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints, useToast } from "contexts"
import { TextArea } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { ToolTipIcon } from "components/Tooltip"
import { editAgent } from "api/Agents"
import { Agent, AgentView } from "../types"

function KnowledgeForm({
  modalView,
  setModalView,
  setTime,
  agent
}: {
  modalView: AgentView,
  setModalView: Dispatch<SetStateAction<AgentView>>
  setTime: Dispatch<SetStateAction<number>>
  agent: Agent
}) {
  const { toastSuccess, toastError } = useToast()

  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ knowledge, setKnowledge ] = useState(agent.knowledge)

  const handleEdit = async () => {
    const result = await editAgent({
      id: agent.id,
      agentType: agent.agentType,
      name: agent.name,
      description: agent.description,
      personality: agent.personality,
      instruction: agent.instruction,
      knowledge,
      knowledgeLink: agent.knowledgeLink
    })
    
    if (result && !result.err) {
      toastSuccess(
        `Update successfully`,
        <></>
      )
      setTime(Date.now())
    } else {
      toastError(
        `Update failed`,
        <></>
      )
    }
    }

  return (
    <Flex 
      position="inherit" 
      flexDirection="column"
      width="100%"
      style={{gap: "32px"}}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
      >
        <ButtonMenu
          activeIndex={modalView === AgentView.Knowledge ? 0 : 1} 
          scale="md"
          variant="secondary"
          onItemClick={(index) => setModalView(index === 0 ? AgentView.Knowledge : AgentView.Webpage)}
          fullWidth={isMobile}
        >
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "8px", 
            borderBottomLeftRadius: "8px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }}>
            Knowledge Base
          </ButtonMenuItem>
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
          }}>
            Webpage Uploads
          </ButtonMenuItem>
        </ButtonMenu>
      </Flex>
      <Flex style={{gap: "12px"}}>
        <Text fontSize={isDesktop ? 20 : (isTablet ? 16 : 14)}>
          Knowledge Base (Optional)
        </Text>
        <ToolTipIcon 
          tooltipMessage="Strong degeneracy tendencies, please specify the exact nsfw directions the agent should amplify" 
        />
      </Flex>
      <Flex style={{gap: "8px"}} justifyContent="space-between" flexDirection="column">
        <TextArea
          id="knowledge base input"
          placeholder="Project information, Twitter text, article text, whitepaper text..."
          scale="md"
          autoComplete="off"
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
        />
      </Flex>
      <Flex justifyContent="center">
        <Button
          variant="primary"
          scale="md"
          onClick={handleEdit}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  )
}

export default KnowledgeForm