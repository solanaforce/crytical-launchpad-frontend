import { CHAIN_IDS } from 'utils/wagmi'
import CreateAgent from 'views/Agents/create'

const IndexPage = () => {
  return <CreateAgent />
}

IndexPage.chains = CHAIN_IDS

export default IndexPage