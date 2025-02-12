import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'contexts'
import { Box, Flex } from 'components/Box'
import { Text } from 'components/Text'
import { Select } from 'components/Select'
import { AgentView } from '../types'

const StyledFlex = styled(Flex) <{ isActive: boolean }>`
  cursor: pointer;
  position: relative;
  padding: 12px;
  border-radius: 4px;
  gap: 16px;
  background: ${({ isActive }) => isActive ? "#ffffff10" : "transparent"};
  &:hover {
    background: #ffffff10;
  }
`

interface ProgressStepsProps {
  step: number;
  setModalView: Dispatch<SetStateAction<AgentView>>
}

export default function AgentSteps({ step, setModalView }: ProgressStepsProps) {
  const { isDesktop } = useMatchBreakpoints()
  return (
    <Box mt="20px">
      {isDesktop && <Flex width="200px">
        <Flex
          flexDirection="column"
          style={{ gap: "16px" }}
          width="100%"
          justifyContent="space-between"
        >
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 0 ? "100%" : "auto"}
            onClick={() => setModalView(AgentView.Telegram)}
            isActive={step === 0}
          >
            <Flex
              flexDirection="column"
              style={{ gap: "12px" }}
              alignItems="left"
            >
              <Text
                fontSize={13}
                lineHeight="140%"
                textAlign="left"
              >
                Bind Chat Interface
              </Text>
            </Flex>
          </StyledFlex>
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 1 ? "100%" : "auto"}
            onClick={() => setModalView(AgentView.Twitter)}
            isActive={step === 1}
          >
            <Flex
              flexDirection="column"
              style={{ gap: "12px" }}
              alignItems="left"
            >
              <Text
                fontSize={13}
                lineHeight="140%"
                textAlign="left"
              >
                Bind Social Media
              </Text>
            </Flex>
          </StyledFlex>
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 2 ? "100%" : "auto"}
            onClick={() => setModalView(AgentView.CreateToken)}
            isActive={step === 2}
          >
            <Flex
              flexDirection="column"
              style={{ gap: "12px" }}
              alignItems="left"
            >
              <Text
                fontSize={13}
                lineHeight="140%"
                textAlign="left"
              >
                Bind a Token
              </Text>
            </Flex>
          </StyledFlex>
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 3 ? "100%" : "auto"}
            onClick={() => setModalView(AgentView.Knowledge)}
            isActive={step === 3}
          >
            <Flex
              flexDirection="column"
              style={{ gap: "12px" }}
              alignItems="left"
            >
              <Text
                fontSize={13}
                lineHeight="140%"
                textAlign="left"
              >
                Advanced
              </Text>
            </Flex>
          </StyledFlex>
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 4 ? "100%" : "auto"}
            onClick={() => setModalView(AgentView.Prompt)}
            isActive={step === 4}
          >
            <Flex
              flexDirection="column"
              style={{ gap: "12px" }}
              alignItems="left"
            >
              <Text
                fontSize={13}
                lineHeight="140%"
                textAlign="left"
              >
                Prompt Testing Sandbox
              </Text>
            </Flex>
          </StyledFlex>
        </Flex>
      </Flex>}
      {!isDesktop && <Flex width="240px" alignItems="center" style={{gap: "8px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path d="M3 6h18" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 12h10" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 18h4" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Select
          options={[
            {
              label: 'Bind Chat Interface',
              value: AgentView.Telegram,
            },
            {
              label: 'Bind Social Media',
              value: AgentView.Twitter,
            },
            {
              label: 'Create a Token',
              value: AgentView.CreateToken,
            },
            {
              label: 'Advanced',
              value: AgentView.Knowledge,
            },
            {
              label: 'Prompt Testing Sandbox',
              value: AgentView.Prompt,
            },
          ]}
          onOptionChange={(option) => { setModalView(option.value) }}
        />
      </Flex>}
    </Box>
  )
}