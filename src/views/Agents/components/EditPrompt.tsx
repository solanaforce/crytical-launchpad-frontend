import { Dispatch, SetStateAction, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Checkbox } from "components/Checkbox"
import { ToolTipIcon } from "components/Tooltip"
import { Input, TextArea } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { descriptionEx, instructionEx, nameEx, personalityEx } from "../constants"
import { Agent, AgentView } from "../types"

function EditPromptForm({
  modalView,
  setModalView,
  agent
}: {
  modalView: AgentView
  setModalView: Dispatch<SetStateAction<AgentView>>
  agent: Agent
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ type, setType ] = useState(0)
  const [ name, setName ] = useState(agent.name)
  const [ description, setDescription ] = useState(agent.description)
  const [ personality, setPersonality ] = useState(agent.personality)
  const [ instruction, setInstruction ] = useState(agent.Instruction)
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
        <Text fontSize={isDesktop ? 20 : (isTablet ? 16 : 14)}>Modify Prompt</Text>
      </Box>
      <Flex style={{gap: isMobile ? "12px" : "32px"}} flexDirection={isMobile ? "column" : "row"}>
        <Flex onClick={() => setType(0)} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === 0}
            value="auto"
            readOnly
          />
          <Flex style={{cursor: "pointer", gap: "4px"}}>
            <Text>Wild Mode</Text>
            <ToolTipIcon tooltipMessage="Strong degeneracy tendencies, please specify the exact nsfw directions the agent should amplify" />
          </Flex>
        </Flex>
        <Flex onClick={() => setType(1)} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === 1}
            value="auto"
            readOnly
          />
          <Flex style={{cursor: "pointer", gap: "4px"}}>
            <Text>Neutral</Text>
            <ToolTipIcon tooltipMessage="Generally safe-for-work, light nsfw tendencies when explicitly prompted" />
          </Flex>
        </Flex>
        <Flex onClick={() => setType(2)} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === 2}
            value="auto"
            readOnly
          />
          <Flex style={{cursor: "pointer", gap: "4px"}}>
            <Text>Safe Mode</Text>
            <ToolTipIcon tooltipMessage="Reject all NSFW requests." />
          </Flex>
        </Flex>
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Name</Text>
        <Input 
          id="token-search-input"
          placeholder={nameEx}
          scale="md"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Description</Text>
        <TextArea 
          id="token-search-input"
          placeholder={descriptionEx}
          scale="md"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Personality</Text>
        <TextArea 
          id="token-search-input"
          placeholder={personalityEx}
          scale="md"
          autoComplete="off"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />
      </Flex>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Instruction</Text>
        <TextArea 
          id="token-search-input"
          placeholder={instructionEx}
          scale="md"
          autoComplete="off"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />
      </Flex>
      <Flex justifyContent="center">
        <Button
          scale="md"
          variant="primary"
        >
          Save Prompt
        </Button>
      </Flex>
    </Flex>
  )
}

export default EditPromptForm