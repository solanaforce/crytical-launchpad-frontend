import { Dispatch, SetStateAction, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Input } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { AgentView } from "../types"

function DiscordForm({
  modalView,
  setModalView
}: {
  modalView: AgentView,
  setModalView: Dispatch<SetStateAction<AgentView>>
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
      <Flex
        justifyContent="center"
        alignItems="center"
      >
        <ButtonMenu
          activeIndex={modalView === AgentView.Telegram ? 0 : 1} 
          scale="md"
          variant="secondary"
          onItemClick={(index) => setModalView(index === 0 ? AgentView.Telegram : AgentView.Discord)}
          fullWidth={isMobile}
        >
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "8px", 
            borderBottomLeftRadius: "8px",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0"
          }}>
            Telegram
          </ButtonMenuItem>
          <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
          }}>
            Discord
          </ButtonMenuItem>
        </ButtonMenu>
      </Flex>
      <Box>
        <Text fontSize={isDesktop ? 20 : (isTablet ? 16 : 14)}>
          Bind Discord Interface
        </Text>
      </Box>
      <Flex style={{gap: "8px"}} justifyContent="space-between" flexDirection={isDesktop ? "row" : "column"}>
        <Input 
          id="token-search-input"
          placeholder='Discord bot Token'
          scale="md"
          autoComplete="off"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          variant="primary"
          scale="sm"
          height="40px"
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  )
}

export default DiscordForm