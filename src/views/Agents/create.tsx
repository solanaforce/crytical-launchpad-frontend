import { useState } from 'react'
import { Flex } from 'components/Box'
import { useMatchBreakpoints } from 'contexts'
import Page from 'Page'
import { CreateFormView } from './types'
import CreateSteps from './components/CreateSteps'
import PromptForm from './components/PromptForm'
import CreateTokensForm from './components/CreateTokensForm'

const CreateAgent: React.FC<React.PropsWithChildren> = () => {
  const { isDesktop } = useMatchBreakpoints()
  const [modalView, setModalView] = useState<CreateFormView>(CreateFormView.Prompt)
  return (
    <Page>
      {modalView === CreateFormView.Prompt && <Flex
          flexDirection={isDesktop ? "row" : "column"}
          style={{gap: isDesktop ? "60px" : "0"}}
          justifyContent="space-between"
        >
          <CreateSteps step={0} setModalView={setModalView} />
          <PromptForm
            setModalView={setModalView}
          />
        </Flex>}
        {modalView === CreateFormView.Tokens && <Flex
          flexDirection={isDesktop ? "row" : "column"}
          style={{gap: isDesktop ? "60px" : "0"}}
          justifyContent="space-between"
        >
          <CreateSteps step={1} setModalView={setModalView} />
          <CreateTokensForm
            setModalView={setModalView}
          />
        </Flex>}
    </Page>
  )
}

export default CreateAgent