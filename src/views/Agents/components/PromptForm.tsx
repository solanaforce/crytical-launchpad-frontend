import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints, useToast } from "contexts"
import { Checkbox } from "components/Checkbox"
import { ToolTipIcon } from "components/Tooltip"
import { Input, TextArea } from "components/Input"
import { Button } from "components/Button"
import { descriptionEx, instructionEx, nameEx, personalityEx } from "../constants"
import { AgentView, CreateFormView } from "../types"
import useAgents from "../hooks/useAgents"
import { createAgent } from "api/Agents"
import { useRouter } from "next/router"

function PromptForm({
  setModalView
}: {
  setModalView: Dispatch<SetStateAction<CreateFormView>>
}) {
  const router = useRouter()
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const { toastSuccess, toastError } = useToast()

  const [ type, setType ] = useState("Safe")
  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ personality, setPersonality ] = useState("")
  const [ instruction, setInstruction ] = useState("")

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

  const handleCreate = async () => {
    if (validate()) {
      const result = await createAgent({
        agentType: type as any,
        name,
        description,
        personality,
        instruction
      })
      
      if (result && !result.err) {
        toastSuccess(
          `Agent Created`,
          <></>
        )
        router.push('/agents')
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
      <Box>
        <Text fontSize={isDesktop ? 35 : (isTablet ? 28 : 23)}>Prompt Your Agent</Text>
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
      <Flex style={{gap: "2px"}} flexDirection="column">
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
      <Flex style={{gap: "2px"}} flexDirection="column">
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
      <Flex style={{gap: "2px"}} flexDirection="column">
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
      <Flex style={{gap: "2px"}} flexDirection="column">
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
      <Flex style={{gap: "12px"}} flexDirection={isMobile ? "column" : "row"}>
        <Button
          scale="md"
          variant="secondary"
          onClick={handleCreate}
        >
          Create without Token
        </Button>
        <Button
          scale="md"
          variant="primary"
          onClick={() => setModalView(CreateFormView.Tokens)}
        >
          Next: Bind a token
        </Button>
      </Flex>
    </Flex>
  )
}

export default PromptForm