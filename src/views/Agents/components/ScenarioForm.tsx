import { Dispatch, SetStateAction, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { TextArea } from "components/Input"
import { Button } from "components/Button"
import { Select } from "components/Select"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { AgentView } from "../types"

function ScenarioForm({
  modalView,
  setModalView
}: {
  modalView: AgentView
  setModalView: Dispatch<SetStateAction<AgentView>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [message, setMessage] = useState("")

  const response = ""
  
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
          activeIndex={modalView === AgentView.Prompt ? 0 : 1} 
          scale="md"
          variant="secondary"
          onItemClick={(index) => setModalView(index === 0 ? AgentView.Prompt : AgentView.Scenario)}
          fullWidth={isMobile}
        >
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "8px", 
            borderBottomLeftRadius: "8px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }}>
            Edit the Prompt
          </ButtonMenuItem>
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
          }}>
            Scenario Testing
          </ButtonMenuItem>
        </ButtonMenu>
      </Flex>
      <Box>
        <Text fontSize={isDesktop ? 13 : (isTablet ? 12 : 11)}>Sandbox is an environment for testing, used to preview the agent's response content. It does not consume credits.</Text>
      </Box>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Select Scenario</Text>
        <Select
          options={[
            {
              label: 'Telegram Reply',
              value: '',
            }
          ]}
          onOptionChange={() => {}}
          />
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>User Message</Text>
        <TextArea 
          id="token-search-input"
          placeholder="Enter user message here"
          scale="md"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Button
          variant="primary"
          scale="sm"
        >Preview Response</Button>
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Response Preview</Text>
        <TextArea 
          id="token-search-input"
          placeholder=""
          scale="md"
          autoComplete="off"
          value={response}
        />
      </Flex>
    </Flex>
  )
}

export default ScenarioForm