import { useAppKitAccount } from "@reown/appkit/react"
import throttle from "lodash/throttle"
import React, { ElementType, useEffect, useMemo, useRef, useState } from "react"
import { Flex } from "components/Box"
import { NextLinkFromReactRouter } from "components/NextLink"
// import { useMatchBreakpoints } from "contexts"
import { Input } from "components/Input"
import ConnectWalletButton from "components/ConnectWalletButton"
import { Text } from "components/Text"
import { useMatchBreakpoints } from "contexts"
import { MenuContext } from "./context"
import { AtomBox } from "../AtomBox"
import { StyledLink, Wrapper, FixedContainer, StyledNav, SearchBox, BodyWrapper } from "./style"

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const {children} = props

  const { address } = useAppKitAccount()
  const { isMobile } = useMatchBreakpoints()

  const linkComponent: ElementType = LinkComponent
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset)

  const totalTopMenuHeight = 64

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= 64) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener("scroll", throttledHandleScroll)
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [totalTopMenuHeight])

  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);

  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
            <StyledNav>
              <Flex alignItems="center">
                <StyledLink href="/" as={linkComponent} aria-label="Crytical home page">
                  <img src="/images/desktop-logo.png" alt="logo" className="desktop-icon" />
                  <img src="/images/mobile-logo.png" alt="logo" className="mobile-icon" />
                </StyledLink>
              </Flex>
              <Flex alignItems="center" style={{gap: "12px"}}>
                <StyledLink href="/agents/create" as={linkComponent} aria-label="Create an agent">
                  <Text>Create Agent</Text>
                </StyledLink>
                <StyledLink href="/agents" as={linkComponent} aria-label="My Agents">
                  <Text>My Agents</Text>
                </StyledLink>
              </Flex>
              <Flex alignItems="center" style={{gap: "12px"}}>
                <SearchBox>
                  <Flex alignItems="center" mr="-10px">
                    <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="#444444" fillRule="evenodd" clipRule="evenodd" />
                    </svg>
                  </Flex>
                  <Input 
                    scale="md"
                    placeholder="Search an agent"
                    height="100%"
                    style={{background: "transparent"}}
                  />
                </SearchBox>
                {address && <appkit-button size="sm" />}
                {!address && <ConnectWalletButton isPushed={!isMobile} />}
              </Flex>
            </StyledNav>
          </FixedContainer>
          <BodyWrapper mt={`${totalTopMenuHeight}px`}>
            {children}
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
    </MenuContext.Provider>
  )
}

export default Menu