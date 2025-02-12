import { Box, Flex } from 'components/Box'
import { useMatchBreakpoints } from 'contexts'
import styled from 'styled-components'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Dispatch, SetStateAction } from 'react'
import { AgentView } from '../types'

const StyledLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 4px;
`


const AgentHeader = ({
    name,
    src,
    isVerified,
    telegram,
    discord,
    twitter,
    token,
    setModalView
  } : {
    name: string,
    src: string,
    isVerified: boolean,
    telegram: string,
    discord: string,
    twitter: string,
    token: string,
    setModalView: Dispatch<SetStateAction<AgentView>>
  }) => {
  const { isDesktop, isTablet, isMobile } = useMatchBreakpoints()
  return (
    <Flex
      alignItems="center"
      flexDirection={isDesktop ? "row" : "column"}
      justifyContent="space-between"
      style={{gap: "24px"}}
    >
      <Flex 
        justifyContent={isDesktop ? "space-between" : "center"} 
        width="100%" 
        mt={isDesktop ? "21px" : "16px"}
      >
        <Flex 
          flexDirection={isDesktop ? "row" : "column"}
          alignItems="center"
          width="100%" 
          style={{gap: isDesktop ? "16px" : "12px"}}
        >
          <Box borderRadius="4px">
            {
              true ? (
                <StyledLogo size={isDesktop ? "96px" : (isTablet ? "72px" : "48px")} src={src} alt="" />
              ) : (
                <StyledLogo size={isDesktop ? "96px" : (isTablet ? "72px" : "48px")} src="https://tophat.one/avatar.png" alt="" />
              )
            }
          </Box>
          <Flex flexDirection="column" style={{gap: isDesktop ? "25px" : "21px"}}>
            <Flex style={{gap: "12px"}} alignItems="center" justifyContent={isDesktop ? "flex-start" : "center"}>
              <Text textAlign="center" fontSize={isDesktop ? "32px" : (isTablet ? "28px" : "24px")} lineHeight={isDesktop ? "140%" : (isTablet ? "90%" : "120%")}>
                {name}
              </Text>
              <Flex background="#ffffff10" p="6px" height="20px" borderRadius="4px" alignItems="center">
                <Text fontSize={11} color="#ffffffaa">
                  {isVerified ? "Verified" : "Unverified"}
                </Text>
              </Flex>
              <Flex 
                background="#ffffff10" 
                p="6px" 
                alignItems="center" 
                style={{gap: "4px", cursor: "pointer"}}
                height="20px" 
                borderRadius="4px"
                onClick={() => {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 24 24">
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" fill="transparent" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.5 6.5l4 4" fill="transparent" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Text fontSize={12} color="#ffffffaa">
                  edit
                </Text>
              </Flex>
            </Flex>
            <Flex style={{gap: "12px"}}>
              {/* =============================Telegram=============================================================================== */}
              <Flex 
                background="#ffffff10" 
                p="12px" 
                alignItems="center" 
                style={{gap: "4px", cursor: "pointer"}}
                height="20px" 
                borderRadius="4px"
                onClick={() => setModalView(AgentView.Telegram)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {!isMobile && <Text fontSize={12} color="#ffffffaa">Telegram</Text>}
                {telegram === "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23252525'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L11%208.5625'%20stroke='%23FAFAFA'%20stroke-linecap='round'/%3e%3c/svg%3e" alt="" />}
                {telegram !== "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23A553FF'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L7%2011.0625L12%205.0625'%20stroke='%23FAFAFA'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="" />}
              </Flex>
              {/* =============================Discord=============================================================================== */}
              <Flex 
                background="#ffffff10" 
                p="12px" 
                alignItems="center" 
                style={{gap: "4px", cursor: "pointer"}}
                height="20px" 
                borderRadius="4px"
                onClick={() => setModalView(AgentView.Discord)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 16.5c3.5 1 6.5 1 10 0" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {!isMobile && <Text fontSize={12} color="#ffffffaa">Discord</Text>}
                {discord === "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23252525'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L11%208.5625'%20stroke='%23FAFAFA'%20stroke-linecap='round'/%3e%3c/svg%3e" alt="" />}
                {discord !== "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23A553FF'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L7%2011.0625L12%205.0625'%20stroke='%23FAFAFA'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="" />}
              </Flex>
              {/* =============================Twitter=============================================================================== */}
              <Flex 
                background="#ffffff10" 
                p="12px" 
                alignItems="center" 
                style={{gap: "4px", cursor: "pointer"}}
                height="20px" 
                borderRadius="4px"
                onClick={() => setModalView(AgentView.Twitter)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {!isMobile && <Text fontSize={12} color="#ffffffaa">Twitter</Text>}
                {twitter === "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23252525'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L11%208.5625'%20stroke='%23FAFAFA'%20stroke-linecap='round'/%3e%3c/svg%3e" alt="" />}
                {twitter !== "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23A553FF'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L7%2011.0625L12%205.0625'%20stroke='%23FAFAFA'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="" />}
              </Flex>
              {/* =============================Token=============================================================================== */}
              <Flex 
                background="#ffffff10" 
                p="12px" 
                alignItems="center" 
                style={{gap: "4px", cursor: "pointer"}}
                height="20px" 
                borderRadius="4px"
                onClick={() => setModalView(AgentView.CreateToken)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M4 18h12l4 -4h-12z" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 14l-4 -4h12l4 4" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 10l4 -4h-12l-4 4" fill="none" stroke="#ffffff55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {!isMobile && <Text fontSize={12} color="#ffffffaa">Token</Text>}
                {token === "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23252525'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L11%208.5625'%20stroke='%23FAFAFA'%20stroke-linecap='round'/%3e%3c/svg%3e" alt="" />}
                {token !== "" && <img width="15px" height="15px" src="data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='7.5'%20cy='8.1875'%20r='7.18824'%20fill='%23A553FF'%20stroke='white'%20stroke-width='0.623529'/%3e%3cpath%20d='M4%208.5625L7%2011.0625L12%205.0625'%20stroke='%23FAFAFA'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" alt="" />}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex 
        justifyContent="space-between" 
        background="#ffffff20"
        borderRadius="4px"
        padding="18px"
        minWidth="320px"
      >
        <Flex
          flexDirection="column"
          style={{gap: "12px"}}
          justifyContent="space-between"
        >
          <Flex style={{gap: "8px"}} alignItems="center">
            <Text fontSize={13}>Credits</Text>
            <Flex
              borderRadius="4px"
              background="#6135b3"
              padding="4px"
              alignItems="center"
            >
              <Text fontSize={11}>Active</Text>
            </Flex>
          </Flex>
          <Text fontSize={20} bold>20</Text>
        </Flex>
        <Flex
          flexDirection="column"
          style={{gap: "12px"}}
          justifyContent="space-between"
        >
          <Flex style={{gap: "8px"}} alignItems="center">
            <Button
              variant='primary'
              scale="sm"
              style={{fontSize: "13px"}}
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
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AgentHeader