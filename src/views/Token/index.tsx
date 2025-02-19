import { useEffect, useRef } from 'react'
import { createOkxSwapWidget } from '@okxweb3/dex-widget'
import { useAppKit } from '@reown/appkit/react'
import { useMatchBreakpoints } from 'contexts'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Flex } from 'components/Box'
import { accountEllipsis } from 'utils/addressEllipsis'
import { useModal } from 'widgets/Modal'
import Page from 'Page'
import { SampleAgents } from 'views/Home/sample'
import { getMcapString } from 'views/Home/utils'
import TopUpModal from './components/TopUpModal'

const Token = ({id} : {id: string}) => {
  const { isDesktop, isMobile } = useMatchBreakpoints()
  const { open } = useAppKit()

  const widgetRef = useRef<HTMLDivElement>(null)

  const agent = SampleAgents.find((s) => s.id === id)

  const [onTopUp] = useModal(
    <TopUpModal />,
    true,
    true,
    `topup-modal-${agent?.id}`
  )

  const provider = window.solana ?? window.ethereum

  const params = {
    chainIds: [501],
    lang: "en_us",
    providerType: 'SOLANA',
    theme: 'dark',
    tradeType: 'swap',
    tokenPair: {
      fromChain: 501,
      toChain: 501,
      fromToken: '11111111111111111111111111111111',
      toToken: agent?.token
    }
  }

  const initialConfig = {
    params: params as any,
    provider,
    listeners: [
      {
        event: 'ON_CONNECT_WALLET',
        handler: (token, preToken) => {
          open()
        }
      }
    ]
  }

  useEffect(() => {
    const widgetHandler = createOkxSwapWidget(widgetRef.current!, initialConfig as any);

    return () => {
      widgetHandler.destroy();
    }
  }, [])

  if (!agent) return null

  return (
    <Page>
      <Flex
        justifyContent="space-between"
        style={{gap: "20px"}}
        flexDirection={!isDesktop ? "column" : "row"}
        mt="24px"
      >
        <Flex
          flexDirection="column"
          width="100%"
          style={{gap: "20px"}}
        >
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            style={{gap: "24px"}}
          >
            <Flex
              style={{gap: "12px"}}
            >
              <img width="76px" src={agent.img} alt="" style={{borderRadius: "8px"}} />
              <Flex justifyContent="space-between" flexDirection="column">
                <Text fontSize={16} bold>{agent.name}</Text>
                <Flex style={{gap: "8px"}}>
                  <Button
                    as={NextLinkFromReactRouter}
                    to={agent.telegram}
                    target="_blank"
                    variant="primary"
                    width="28px" 
                    height="28px"
                    padding="4px"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" fill="none" stroke="#ffffffbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                  <Button
                    as={NextLinkFromReactRouter}
                    to={agent.twitter}
                    target="_blank"
                    variant="primary"
                    width="28px" 
                    height="28px"
                    padding="4px"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" fill="none" stroke="#ffffffbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" fill="none" stroke="#ffffffbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                  <Button
                    as={NextLinkFromReactRouter}
                    to={`https://dexscreener.com/solana/${agent.token}`}
                    target="_blank"
                    variant="primary"
                    width="28px" 
                    height="28px"
                    padding="4px"
                  >
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1505_4037)">
                        <path d="M4.0801 10.7388C4.37289 10.901 4.6474 11.0534 4.92236 11.2056C5.20115 11.3599 5.47837 11.517 5.75942 11.6674C6.06215 11.8296 6.31318 12.0479 6.52312 12.3162C6.95046 12.862 7.24979 13.4765 7.51482 14.109C7.96405 15.1811 8.29274 16.2927 8.61984 17.4049C8.73926 17.811 8.86094 18.2163 9.00722 18.6265C9.02077 18.5877 9.03589 18.5496 9.04786 18.5104C9.34878 17.5225 9.63931 16.5315 9.95332 15.5476C10.2371 14.6582 10.5707 13.7866 11.0369 12.9712C11.1182 12.8291 11.208 12.6916 11.2988 12.5553C11.5656 12.154 11.9047 11.8343 12.3404 11.6081C12.8327 11.3526 13.3131 11.0743 13.7987 10.8056C13.8337 10.7862 13.8678 10.7655 13.9161 10.7372C13.8628 10.7056 13.8253 10.6826 13.7872 10.6608C13.1293 10.2858 12.472 9.90977 11.8123 9.53792C11.7374 9.49559 11.7123 9.4488 11.7083 9.36369C11.6956 9.10814 11.669 8.85349 11.6475 8.59838C11.6444 8.56229 11.6396 8.5262 11.636 8.49323C11.8582 8.46961 12.0726 8.46003 12.2817 8.42193C12.8214 8.32323 13.2989 8.09509 13.6686 7.68759C14.2578 7.03814 14.3423 6.29578 14.0434 5.49594C13.9876 5.34667 13.9086 5.20608 13.8465 5.05882C13.8343 5.02963 13.8377 4.9775 13.8569 4.95455C14.2089 4.52945 14.5642 4.10725 14.9193 3.68461C14.9236 3.67948 14.9315 3.67703 14.9511 3.66522C15.01 3.77551 15.0705 3.88401 15.127 3.99474C15.6667 5.05503 15.8961 6.17881 15.8728 7.36432C15.8552 8.25862 15.8618 9.15426 15.8891 10.0483C15.9559 12.2309 16.455 14.31 17.4711 16.2588C17.4815 16.2786 17.4905 16.2989 17.4998 16.3192C17.5007 16.3212 17.4975 16.3247 17.4905 16.3401C16.723 15.7294 15.9579 15.121 15.1834 14.5045C14.6296 15.391 14.0818 16.2682 13.5251 17.1591C12.9433 16.6191 12.3693 16.0861 11.783 15.5418C10.8556 17.0268 9.93346 18.5037 8.9991 20C8.06744 18.5082 7.1455 17.0317 6.2152 15.5421C5.63368 16.0819 5.05984 16.6148 4.47312 17.1593C3.91914 16.2724 3.3699 15.3932 2.8148 14.5045C2.04275 15.1187 1.27973 15.7256 0.516931 16.3328C0.511287 16.3292 0.505644 16.3259 0.5 16.3223C0.513996 16.2911 0.526186 16.2592 0.541989 16.2289C1.39734 14.5825 1.8933 12.8322 2.04523 10.9923C2.11115 10.1943 2.1107 9.39065 2.12898 8.58947C2.14049 8.08105 2.13417 7.57218 2.13056 7.06354C2.12221 5.86155 2.44525 4.74668 3.02835 3.69887C3.03377 3.68929 3.04122 3.68082 3.05386 3.66389C3.07418 3.68639 3.09314 3.706 3.11075 3.72694C3.44914 4.12953 3.7855 4.53368 4.12728 4.93338C4.17243 4.98618 4.17627 5.02183 4.14647 5.07887C3.98867 5.38031 3.85548 5.69067 3.81146 6.0311C3.69882 6.90268 4.08981 7.67222 4.87179 8.1167C5.28829 8.35331 5.7391 8.46738 6.21859 8.47496C6.26283 8.47562 6.30731 8.47496 6.36329 8.47496C6.34613 8.61911 6.32649 8.75033 6.31588 8.88201C6.30257 9.04843 6.29173 9.21531 6.2897 9.38218C6.28879 9.45571 6.26238 9.49425 6.19917 9.5299C5.52713 9.91021 4.85666 10.2934 4.18597 10.6762C4.15685 10.6927 4.12841 10.7105 4.08055 10.739L4.0801 10.7388Z" fill="#ffffffbb" />
                        <path d="M2.43705 1.00548C2.59394 1.16522 2.73616 1.34212 2.91044 1.47914C3.12354 1.64669 3.36057 1.78549 3.59354 1.9263C3.67165 1.97353 3.76895 1.99046 3.85857 2.01764C3.99424 2.05886 4.09786 2.03079 4.20802 1.92407C5.36542 0.802066 6.75804 0.16108 8.3719 0.0278478C10.4806 -0.146156 12.3064 0.497058 13.8275 1.95771C13.8975 2.02477 13.9654 2.06332 14.0555 2.03146C14.249 1.96306 14.4501 1.90669 14.6293 1.81089C14.9666 1.63042 15.2445 1.37376 15.4831 1.077C15.5061 1.04826 15.5294 1.01974 15.5707 0.997681C15.5594 1.03288 15.5495 1.06875 15.5366 1.10329C15.3312 1.65605 15.0253 2.154 14.6587 2.61362C13.462 4.11438 11.9981 5.29877 10.2846 6.18505C10.1892 6.23451 10.1248 6.22939 10.0343 6.16857C9.38008 5.72943 8.599 5.73634 7.9405 6.18283C7.87458 6.22761 7.82582 6.24098 7.74975 6.20199C5.96794 5.28629 4.45228 4.05668 3.23574 2.47549C2.91631 2.0602 2.65218 1.61104 2.46798 1.11955C2.45624 1.08836 2.4454 1.05672 2.43524 1.02486C2.43321 1.01862 2.43637 1.0106 2.43705 1.0057V1.00548Z" fill="#ffffffbb" />
                        <path d="M6.33594 10.7138C6.49306 10.6241 6.64792 10.5347 6.80346 10.4467C6.93055 10.3747 7.05855 10.3039 7.1861 10.2328C7.33893 10.1477 7.40687 10.0178 7.40055 9.84583C7.38385 9.40336 7.39356 8.96244 7.48882 8.5271C7.60892 7.97879 7.86536 7.51337 8.32431 7.16759C8.75774 6.84119 9.24286 6.84231 9.67539 7.16893C10.1793 7.54947 10.4481 8.06658 10.5316 8.67214C10.5836 9.04911 10.5885 9.43343 10.5955 9.81464C10.5994 10.0189 10.6675 10.1582 10.8533 10.2556C11.1123 10.391 11.3628 10.5423 11.6168 10.6873C11.6319 10.696 11.6452 10.7083 11.6658 10.7236C11.6437 10.7397 11.6301 10.7515 11.615 10.7602C10.8545 11.1951 10.317 11.8301 9.92123 12.5936C9.58577 13.241 9.36206 13.9301 9.14038 14.6201C9.09748 14.7536 9.05459 14.8868 9.00177 15.0519C8.97806 14.9866 8.96497 14.9512 8.95233 14.9156C8.72636 14.2786 8.52161 13.6329 8.26855 13.0066C7.97553 12.2812 7.54797 11.636 6.92559 11.1363C6.74251 10.9892 6.5434 10.8616 6.33594 10.7138Z" fill="#ffffffbb" />
                        <path d="M5.05761 5.75484C5.74071 6.2842 6.46694 6.73069 7.25276 7.12192C7.05975 7.23398 6.86899 7.30149 6.6674 7.34159C6.27257 7.42024 5.88745 7.39306 5.52197 7.21928C4.89191 6.91939 4.74382 6.32876 5.05738 5.75506L5.05761 5.75484Z" fill="#ffffffbb" />
                        <path d="M12.9394 5.75573C13.1747 6.15543 13.176 6.68368 12.7801 7.0201C12.4112 7.33357 11.9717 7.42581 11.5037 7.36432C11.2838 7.33536 11.0721 7.24579 10.8576 7.1814C10.8238 7.17116 10.7937 7.14776 10.7461 7.1217C11.5319 6.73024 12.2608 6.28264 12.9394 5.75573Z" fill="#ffffffbb" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1505_4037">
                          <rect width="17" height="20" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection="column" style={{gap: "12px"}} justifyContent="space-between">
              <Flex style={{gap: "20px"}} alignItems="center" justifyContent="space-between">
                <Flex style={{gap: "8px"}} flexDirection="column">
                  <Text>Credit Used</Text>
                  <Text>{agent.creditUsed}</Text>
                </Flex>
                <Flex style={{gap: "8px"}} flexDirection="column">
                  <Text>Remaining</Text>
                  <Text>{agent.creditRemaining}</Text>
                </Flex>
                <Button
                  variant='primary'
                  scale="sm"
                  style={{fontSize: "13px"}}
                  onClick={onTopUp}
                >
                  <Flex alignItems="center" style={{gap: "6px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <Text fontSize={13}>Top up</Text>
                  </Flex>
                </Button>
              </Flex>
              <Flex
                backgroundColor="#ffffff30"
                borderRadius="4px"
                p="1px 8px"
                alignItems="center"
                justifyContent="space-between"
                style={{gap: "12px"}}
              >
                <Text fontSize={11} color="#35C77B" lineHeight="90%">Mcap: {getMcapString(agent.mcap)}</Text>
                <Flex alignItems="center" style={{gap: "8px"}}>
                  <Text fontSize={11} lineHeight="90%">Contract {accountEllipsis(agent.token)}</Text>
                  <Button
                    variant="text"
                    p="0"
                  >
                    <svg width="13" height="13" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="#ffffffbb" fillRule="evenodd" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex borderRadius="8px">
            <div id="dexscreener-embed">
              <iframe src={`https://dexscreener.com/solana/${agent.token}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&loadChartSettings=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`} title="Dexscreener-Chart" />
            </div>
          </Flex>
        </Flex>
        <Flex>
          <Flex ref={widgetRef} width="100%" justifyContent="center" />
        </Flex>
      </Flex>
    </Page>
  )
}

export default Token