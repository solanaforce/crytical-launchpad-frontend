import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from 'contexts'
import { Box, Flex } from 'components/Box'
import { Text } from 'components/Text'
import { Select } from 'components/Select'
import { CreateFormView } from '../types'

const StyledFlex = styled(Flex)<{isActive: boolean}>`
  cursor: pointer;
  position: relative;
  padding: 12px;
  border-radius: 4px;
  gap: 16px;
  background: ${({isActive}) => isActive ? "#ffffff10" : "transparent"};
  &:hover {
    background: #ffffff10;
  }
`

interface ProgressStepsProps {
  step: number;
  setModalView: Dispatch<SetStateAction<CreateFormView>>
}

export default function CreateSteps({ step, setModalView }: ProgressStepsProps) {
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
            onClick={() => setModalView(CreateFormView.Prompt)}
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
                Prompt Your Agent
              </Text>
            </Flex>
          </StyledFlex>
          <StyledFlex
            flexDirection="row"
            alignItems="left"
            width={step === 1 ? "100%" : "auto"}
            onClick={() => setModalView(CreateFormView.Tokens)}
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
                Bind A Token
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
              label: 'Prompt You Agent',
              value: CreateFormView.Prompt,
            },
            {
              label: 'Bind A Token',
              value: CreateFormView.Tokens,
            }
          ]}
          onOptionChange={(option) => { setModalView(option.value) }}
        />
      </Flex>}
    </Box>
  )
}