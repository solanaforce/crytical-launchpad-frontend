import memoize from 'lodash/memoize'
import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { solana, solanaDevnet, AppKitNetwork } from '@reown/appkit/networks'
import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ManropeFont } from 'Global'

export const chains: [AppKitNetwork, ...AppKitNetwork[]] = [solana, solanaDevnet]

const projectId = 'a422ab186dd0923a8d9845b0a6abcbeb'

const metadata = {
  name: 'Crytical',
  description: '',
  url: '', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// export const wagmiAdapter = new WagmiAdapter({
//   ssr: true,
//   projectId,
//   networks: chains
// })

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

// export const config = wagmiAdapter.wagmiConfig

createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  allowUnsupportedChain: false,
  networks: chains,
  metadata,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    onramp: false,
    email: false, // default to true
    socials: false,
    emailShowWallets: false, // default to true
    swaps: false
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#1a202c',
    '--w3m-color-mix-strength': 10,
    '--w3m-font-family': ManropeFont.style.fontFamily,
    '--w3m-accent': '#ffffff',
    '--w3m-border-radius-master': '0.2px'
  }
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => (CHAIN_IDS as number[]).includes(chainId))
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId)
  return found ? 'testnet' in found : false
})
