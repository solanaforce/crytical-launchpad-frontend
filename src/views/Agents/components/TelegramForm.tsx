import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints, useToast } from "contexts"
import { Input } from "components/Input"
import { Button } from "components/Button"
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu"
import { Agent, AgentView } from "../types"
import { bindTelegram, unbindTelegram } from "api/Agents"
import { getBotUsername, testgetUpdates } from "api/Telegram"

function TelegramForm({
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
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const [ address, setAddress ] = useState(agent.settings?.telegram?.botFatherAPIKey)

  const [channel, setChannel] = useState("")

  const [ bot, setBot ] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const { toastSuccess, toastError } = useToast()

  useEffect(() => {
    const getData = async () => {
      try {
        const _bot = await getBotUsername(address)
        const result = await testgetUpdates(address)
        console.log(result)
        setBot(_bot)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [address])

  const handleBind = async () => {
    if (!bot) {
      toastError(
        `Invalid bot token`,
        <></>
      )
      return
    }
    const result = await bindTelegram({
      id: agent.id,
      botFatherAPIKey: address
    })
    if (result && !result.err) {
      toastSuccess(
        `Bound Successfully`,
        <></>
      )
      setTime(Date.now())
    } else {
      toastError(
        `Binding Failed`,
        <></>
      )
    }
  }

  const handleUnbind = async () => {
    const result = await unbindTelegram({
      id: agent.id
    })
    if (result && !result.err) {
      toastSuccess(
        `Unbound Successfully`,
        <></>
      )
      setAddress("")
      setTime(Date.now())
    } else {
      toastError(
        `Unbinding Failed`,
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
          Bind Telegram Interface
        </Text>
      </Box>
      {
        agent && 
        agent.settings && 
        agent.settings.telegram && 
        agent.settings.telegram.botFatherAPIKey ? <Flex style={{gap: "12px"}} justifyContent="space-between" flexDirection="column">
        <Flex style={{gap: "8px"}} justifyContent="flex-start" alignItems="center">
          <Text>@{bot}</Text>
          <Button
            variant="primary"
            scale="sm"
            height="40px"
            onClick={handleUnbind}
          >
            Unbind
          </Button>
        </Flex>
        <Flex style={{gap: "8px"}} justifyContent="space-between" flexDirection={isDesktop ? "row" : "column"}>
          <Input 
            id="token-search-input"
            placeholder='Telegram Channel Link'
            scale="md"
            autoComplete="off"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <Button
            variant="primary"
            scale="sm"
            height="40px"
            onClick={handleBind}
          >
            Confirm
          </Button>
        </Flex>
      </Flex> : 
      <Flex style={{gap: "8px"}} justifyContent="space-between" flexDirection={isDesktop ? "row" : "column"}>
        <Input 
          id="token-search-input"
          placeholder='Telegram bot token'
          scale="md"
          autoComplete="off"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          variant="primary"
          scale="sm"
          height="40px"
          onClick={handleBind}
        >
          Confirm
        </Button>
      </Flex>}
    </Flex>
  )
}

export default TelegramForm