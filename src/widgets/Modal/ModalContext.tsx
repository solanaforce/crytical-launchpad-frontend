import { AnimatePresence, LazyMotion, m } from "framer-motion";
import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import get from "lodash/get";
import { Overlay } from "components/Overlay";
import { useIsomorphicEffect } from "hooks/useIsomorphicEffect";
import {
  animationHandler,
  animationMap,
  animationVariants,
  appearAnimation,
  disappearAnimation,
} from "utils/animationToolkit";
import getPortalRoot from "utils/getPortalRoot";
import { ModalContainer } from "./styles";
import { Handler } from "./types";

const DomMax = () => import("./motionDomMax").then((mod) => mod.default);
const DomAnimation = () => import("./motionDomAnimation").then((mod) => mod.default);

const mountAnimation = keyframes`
  0% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0%);
  }
`

export const unmountAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(20%);
  }
`

interface ModalsContext {
  isOpen: boolean;
  nodeId: string;
  modalNode: React.ReactNode;
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void;
  onDismiss: Handler;
}

export const StyledModalWrapper = styled(m.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  will-change: opacity;
  opacity: 0;
  &.appear {
    animation: ${appearAnimation} 0.3s ease-in-out forwards;
    ${ModalContainer} {
      animation: ${mountAnimation} 0.3s ease-in-out forwards;
      ${({ theme }) => theme.mediaQueries.md} {
        animation: none;
      }
    }
  }
  &.disappear {
    animation: ${disappearAnimation} 0.3s ease-in-out forwards;
    ${ModalContainer} {
      animation: ${unmountAnimation} 0.3s ease-in-out forwards;
      ${({ theme }) => theme.mediaQueries.md} {
        animation: none;
      }
    }
  }
` as typeof m.div;

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: "",
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
});

const ModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>();
  const [nodeId, setNodeId] = useState("");
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const animationRef = useRef<HTMLDivElement>(null);

  useIsomorphicEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  const handlePresent = useCallback((node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => {
    setModalNode(node);
    setIsOpen(true);
    setNodeId(newNodeId);
    setCloseOnOverlayClick(closeOverlayClick);
  }, []);

  const handleDismiss = useCallback(() => {
    setModalNode(undefined);
    setIsOpen(false);
    setNodeId("");
    setCloseOnOverlayClick(true);
  }, []);

  const handleOverlayDismiss = useCallback(() => {
    if (closeOnOverlayClick) {
      const customOnDismiss = get(modalNode, "props.customOnDismiss") as any;
      customOnDismiss?.();
      handleDismiss();
    }
  }, [closeOnOverlayClick, handleDismiss, modalNode]);

  const providerValue = useMemo(() => {
    return { isOpen, nodeId, modalNode, setModalNode, onPresent: handlePresent, onDismiss: handleDismiss };
  }, [isOpen, nodeId, modalNode, setModalNode, handlePresent, handleDismiss]);

  const handleAnimationStart = useCallback(() => animationHandler(animationRef.current), []);

  const portal = useMemo(() => getPortalRoot(), []);

  return (
    <Context.Provider value={providerValue}>
      {portal &&
        createPortal(
          <LazyMotion features={isMobile ? DomMax : DomAnimation}>
            <AnimatePresence>
              {isOpen && (
                <StyledModalWrapper
                  ref={animationRef}
                  onAnimationStart={handleAnimationStart}
                  {...animationMap}
                  variants={animationVariants}
                  transition={{ duration: 0.3 }}
                >
                  <Overlay onClick={handleOverlayDismiss} />
                  {React.isValidElement(modalNode) &&
                    React.cloneElement(modalNode, {
                      // @ts-ignore
                      onDismiss: handleDismiss,
                    })}
                </StyledModalWrapper>
              )}
            </AnimatePresence>
          </LazyMotion>,
          portal
        )}
      {children}
    </Context.Provider>
  );
};

export default ModalProvider;
