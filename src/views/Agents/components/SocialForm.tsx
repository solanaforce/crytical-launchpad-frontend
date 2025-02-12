import { Box, Flex } from "components/Box"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { Button } from "components/Button"

function SocialForm() {
  const { isTablet, isDesktop } = useMatchBreakpoints()

  return (
    <Flex 
      position="inherit" 
      flexDirection="column"
      width="100%"
      style={{gap: "32px"}}
    >
      <Box>
        <Text fontSize={isDesktop ? 20 : (isTablet ? 16 : 14)}>
          Bind Your Twitter Account
        </Text>
      </Box>
      <Flex justifyContent="center">
        <Button
          variant="primary"
          scale="sm"
          height="40px"
        >
          Click to bind
        </Button>
      </Flex>
    </Flex>
  )
}

export default SocialForm