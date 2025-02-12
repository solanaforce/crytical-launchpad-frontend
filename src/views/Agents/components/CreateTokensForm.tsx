import { Dispatch, SetStateAction, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Input } from "components/Input"
import { Button } from "components/Button"
import { Select } from "components/Select"
import { CreateFormView } from "../types"

function CreateTokensForm({
  setModalView
}: {
  setModalView: Dispatch<SetStateAction<CreateFormView>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ address, setAddress ] = useState("")
  return (
    <Flex 
      position="inherit" 
      flexDirection="column"
      width="100%"
      style={{gap: "32px"}}
    >
      <Box>
        <Text fontSize={isDesktop ? 35 : (isTablet ? 28 : 23)}>Bind a Token</Text>
      </Box>
      <Flex style={{gap: "8px"}} flexDirection="column">
        <Text>Token Address</Text>
        <Flex flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" style={{gap: "12px"}}>
          <Input 
            id="token-search-input"
            placeholder="Token contract address"
            scale="md"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Box width="250px">
            <Select
              options={[
                {
                  label: 'Solana',
                  value: '',
                }
              ]}
              onOptionChange={() => {}}
              />
          </Box>
        </Flex>
      </Flex>
      <Flex style={{gap: "12px"}} flexDirection={isMobile ? "column" : "row"}>
        <Button
          scale="md"
          variant="secondary"
          onClick={() => setModalView(CreateFormView.Prompt)}
        >
          Back: Prompt Your Agent
        </Button>
        <Button
          scale="md"
          variant="primary"
        >
          Create Agent
        </Button>
      </Flex>
    </Flex>
  )
}

export default CreateTokensForm