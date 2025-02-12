import { Dispatch, SetStateAction, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Checkbox } from "components/Checkbox"
import { ToolTipIcon } from "components/Tooltip"
import { Input, TextArea } from "components/Input"
import { Button } from "components/Button"
import { descriptionEx, instructionEx, nameEx, personalityEx } from "../constants"
import { CreateFormView } from "../types"

function PromptForm({
  setModalView
}: {
  setModalView: Dispatch<SetStateAction<CreateFormView>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ type, setType ] = useState(0)
  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ personality, setPersonality ] = useState("")
  const [ instruction, setInstruction ] = useState("")
  return (
    <Flex 
      position="inherit" 
      flexDirection="column"
      width="100%"
      style={{gap: "32px"}}
    >
      <Box>
        <Text fontSize={isDesktop ? 35 : (isTablet ? 28 : 23)}>Prompt Your Agent</Text>
        {/* <Text fontSize={isDesktop ? 13 : (isTablet ? 12 : 11)}>Don't worry - you can edit it in the future</Text> */}
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
      <Flex style={{gap: "12px"}} flexDirection={isMobile ? "column" : "row"}>
        <Button
          scale="md"
          variant="secondary"
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