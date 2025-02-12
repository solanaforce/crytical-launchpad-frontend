import { Dispatch, SetStateAction, useState } from "react"
import { Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Input } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { ToolTipIcon } from "components/Tooltip"
import { AgentView } from "../types"

function WebpageForm({
  modalView,
  setModalView
}: {
  modalView: AgentView,
  setModalView: Dispatch<SetStateAction<AgentView>>
}) {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [address, setAddress] = useState("")

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
          {/* <ButtonMenuItem height="42px" style={{
            borderTopLeftRadius: "0", 
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
          }}>
            APIs
          </ButtonMenuItem> */}
        </ButtonMenu>
      </Flex>
      <Flex style={{gap: "12px"}}>
        <Text fontSize={isDesktop ? 20 : (isTablet ? 16 : 14)}>
        Add link to automatically extract knowledge base
        </Text>
        <ToolTipIcon 
          tooltipMessage={`Always preview the links to make sure it’s accessible.
Websites that require logins such as Twitter is not supported.`}
        />
      </Flex>
      <Flex style={{gap: "8px"}} justifyContent="space-between" flexDirection={isDesktop ? "row" : "column"}>
        <Input 
          id="webpage link input"
          placeholder="https://..."
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
          Add
        </Button>
      </Flex>
    </Flex>
  )
}

export default WebpageForm