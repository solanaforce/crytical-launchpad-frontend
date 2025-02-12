import { CHAIN_IDS } from 'utils/wagmi'
import Agents from 'views/Agents'

const IndexPage = () => {
  return <Agents />
}

IndexPage.chains = CHAIN_IDS

export default IndexPage