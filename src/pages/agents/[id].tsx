import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import CreateAgent from 'views/Agents/create'
import Agent from 'views/Agents/agent'

const AgentPage = () => {
  const router = useRouter()

  if (router.query.address === "create")
    return <CreateAgent />

  const id = router.query.id as string
  if (!id) return null
  return <Agent id={id} />
}

AgentPage.chains = CHAIN_IDS

export default AgentPage