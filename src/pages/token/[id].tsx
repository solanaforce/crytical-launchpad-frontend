import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import Token from 'views/Token'

const TokenPage = () => {
  const router = useRouter()

  const id = router.query.id as string
  if (!id) return null
  return <Token id={id} />
}

TokenPage.chains = CHAIN_IDS

export default TokenPage