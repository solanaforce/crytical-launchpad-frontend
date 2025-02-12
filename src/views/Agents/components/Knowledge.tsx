import { Dispatch, SetStateAction, useState } from "react"
import { Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { TextArea } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { ToolTipIcon } from "components/Tooltip"
import { AgentView } from "../types"

function KnowledgeForm({
  modalView,
  setModalView
}: {
  modalView: AgentView,
  setModalView: Dispatch<SetStateAction<AgentView>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ description, setDescription ] = useState("")

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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Flex>
      <Flex justifyContent="center">
        <Button
          variant="primary"
          scale="md"
        >
          Save
        </Button>
      </Flex>
    </Flex>
  )
}

export default KnowledgeForm