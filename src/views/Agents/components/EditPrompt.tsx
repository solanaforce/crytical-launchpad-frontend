import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints, useToast } from "contexts"
import { Checkbox } from "components/Checkbox"
import { ToolTipIcon } from "components/Tooltip"
import { Input, TextArea } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { editAgent } from "api/Agents"
import { descriptionEx, instructionEx, nameEx, personalityEx } from "../constants"
import { Agent, AgentView } from "../types"

function EditPromptForm({
  modalView,
  setModalView,
  agent,
  setTime
}: {
  modalView: AgentView
  setModalView: Dispatch<SetStateAction<AgentView>>
  agent: Agent
  setTime: Dispatch<SetStateAction<number>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()

  const { toastSuccess, toastError } = useToast()

  const [ type, setType ] = useState(agent.agentType)
  const [ name, setName ] = useState(agent.name)
  const [ description, setDescription ] = useState(agent.description)
  const [ personality, setPersonality ] = useState(agent.personality)
  const [ instruction, setInstruction ] = useState(agent.instruction)

  const [nameError, setNameError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [personalityError, setPersonalityError] = useState("")
  const [instructionError, setInstructionError] = useState("")

  const validate = () => {
    setNameError("")
    setDescriptionError("")
    setPersonalityError("")
    setInstructionError("")

    if (name.length === 0) setNameError("name is required")
    if (description.length === 0) setDescriptionError("String must contain at least 1 character(s)")
    if (personality.length === 0) setPersonalityError("String must contain at least 1 character(s)")
    if (instruction.length === 0) setInstructionError("String must contain at least 1 character(s)")

    return name.length > 0 &&
      description.length > 0 &&
      personality.length > 0 &&
      instruction.length > 0
  }

  useEffect(() => {
    setNameError("")
    setDescriptionError("")
    setPersonalityError("")
    setInstructionError("")
  }, [name, description, personality, instruction])

  const handleEdit = async () => {
    if (validate()) {
      const result = await editAgent({
        id: agent.id,
        agentType: type as any,
        name,
        description,
        personality,
        instruction,
        Knowledge: agent.knowledge,
        knowledgeLink: agent.knowledgeLink
      })
      
      if (result && !result.err) {
        toastSuccess(
          `Saved Successfully`,
          <></>
        )
        setTime(Date.now())
      } else {
        toastError(
          `Failed`,
          <></>
        )
      }
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
        <Flex onClick={() => setType("Wild")} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === "Wild"}
            value="auto"
            readOnly
          />
          <Flex style={{cursor: "pointer", gap: "4px"}}>
            <Text>Wild Mode</Text>
            <ToolTipIcon tooltipMessage="Strong degeneracy tendencies, please specify the exact nsfw directions the agent should amplify" />
          </Flex>
        </Flex>
        <Flex onClick={() => setType("Neutral")} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === "Neutral"}
            value="auto"
            readOnly
          />
          <Flex style={{cursor: "pointer", gap: "4px"}}>
            <Text>Neutral</Text>
            <ToolTipIcon tooltipMessage="Generally safe-for-work, light nsfw tendencies when explicitly prompted" />
          </Flex>
        </Flex>
        <Flex onClick={() => setType("Safe")} style={{gap: "8px"}}>
          <Checkbox
            scale="sm"
            checked={type === "Safe"}
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
        {nameError !== "" && <Text fontSize={13} color="red">{nameError}</Text>}
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
        {descriptionError !== "" && <Text fontSize={13} color="red">{descriptionError}</Text>}
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
        {personalityError !== "" && <Text fontSize={13} color="red">{personalityError}</Text>}
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
        {instructionError !== "" && <Text fontSize={13} color="red">{instructionError}</Text>}
      </Flex>
      <Flex justifyContent="center">
        <Button
          scale="md"
          variant="primary"
          onClick={handleEdit}
        >
          Save Prompt
        </Button>
      </Flex>
    </Flex>
  )
}

export default EditPromptForm