import { useCallback } from "react"
import { bindTelegram, createAgent } from "api/Agents";
import { AgentEditPrompt, AgentPrompt } from "../types";

const useAgents = () => {
  const accessToken = localStorage.getItem("access_token");
  const handleCreateAgent = useCallback(
    async(data: AgentPrompt) => {
      const result = await createAgent(data)
      return result
    },
    [accessToken]
  )

  const handleEditAgent = useCallback(
    async(data: AgentEditPrompt) => {
      const result = await createAgent(data)
      return result
    },
    [accessToken]
  )

  const handleBindTelegram = useCallback(
    async(data) => {
      const result = await bindTelegram(data)
      return result
    },
    [accessToken]
  )

  return {
    onCreateAgent: handleCreateAgent,
    onEditAgent: handleEditAgent,
    onBindTelegram: handleBindTelegram
  }
}

export default useAgents