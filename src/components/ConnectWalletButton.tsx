import { useAppKit } from '@reown/appkit/react'
import { Button } from './Button'
import { WalletFilledIcon } from './Svg'
import { Flex } from './Box'
import { Text } from './Text'

const ConnectWalletButton = ({isPushed = true}: {isPushed?: boolean}) => {
  const { open } = useAppKit()
  return <Button
    onClick={() => open()}
    height="40px"
    px="15px"
    variant='primary'
  >
    <Flex alignItems="center" style={{gap: "6px"}}>
      <WalletFilledIcon width="24px" />
      {isPushed && <Text fontSize="14px" color="primary">Connect Wallet</Text>}
    </Flex>
  </Button>
}

export default ConnectWalletButton
