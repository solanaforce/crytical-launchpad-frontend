import { useTooltip } from "hooks/useTooltip";
import { useState } from "react";
import { Box, Flex } from "components/Box";

interface ToolTipIconProps {
  tooltipMessage: string;
}

export const ToolTipIcon: React.FC<React.PropsWithChildren<ToolTipIconProps>> = ({
  tooltipMessage
}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);

  const { targetRef, tooltip } = useTooltip(tooltipMessage, {
    placement: "auto",
    manualVisible: true,
    trigger: "hover",
  });
  
  return (
    <>
      <Flex ref={targetRef} alignItems="center">
        <Box
          onMouseEnter={() => setIsTooltipDisplayed(true)}
          onMouseLeave={() => setIsTooltipDisplayed(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" data-state="closed">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 17l0 .01" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
      </Flex>
      {isTooltipDisplayed && tooltip}
    </>
  );
};
