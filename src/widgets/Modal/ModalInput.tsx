import BigNumber from "bignumber.js";
import styled from "styled-components";
import { Flex } from "components/Box";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { Balance } from "components/Balance";
import { Input, InputProps } from "components/Input";

interface ModalInputProps {
  max: string;
  maxAmount?: BigNumber;
  symbol: string;
  onSelectMax?: () => void;
  onPercentInput?: (percent: number) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  valueUSDPrice?: BigNumber;
  addLiquidityUrl?: string;
  inputTitle?: string;
  decimals?: number;
  needEnable?: boolean;
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: #191d2469;
  // border-radius: 16px;
  box-shadow: ${({ theme, isWarning }) => (isWarning ? "#ffcd38" : theme.shadows.inset)};
  color: #F4EEFF;
  padding: 8px 16px 8px 0;
  width: 100%;
`;

const StyledInput = styled(Input)`
  box-shadow: none;
  margin: 0 0 0 16px;
  padding: 0 8px;
  border: none;
  background: transparent;
  font-size: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    // width: auto;
  }
`;

const ModalInput: React.FC<React.PropsWithChildren<ModalInputProps>> = ({
  max,
  maxAmount,
  symbol,
  onChange,
  onSelectMax,
  onPercentInput,
  value,
  valueUSDPrice,
  decimals = 18,
}) => {
  const isBalanceZero = max === "0" || !max;

  // const percentAmount = useMemo(
  //   () => ({
  //     25: maxAmount ? trimTrailZero(maxAmount.dividedBy(100).multipliedBy(25).toNumber().toFixed(decimals)) : undefined,
  //     50: maxAmount ? trimTrailZero(maxAmount.dividedBy(100).multipliedBy(50).toNumber().toFixed(decimals)) : undefined,
  //     75: maxAmount ? trimTrailZero(maxAmount.dividedBy(100).multipliedBy(75).toNumber().toFixed(decimals)) : undefined,
  //   }),
  //   [maxAmount, decimals]
  // );

  const isAtPercentMax = maxAmount && value === maxAmount.toString();

  return (
    <div style={{ position: "relative" }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px">
            {symbol}
          </Text>
          {/* <Text fontSize="14px">
            {`Balance: ${displayBalance({
                balance: max as `${number}`,
                decimals,
                isBalanceZero,
              })}`}
          </Text> */}
        </Flex>
        <Flex justifyContent="space-between">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
        </Flex>
        {valueUSDPrice && (
          <Flex justifyContent="flex-start" ml="1rem">
            <Flex maxWidth="200px">
              <Balance
                display="inline"
                fontSize="12px"
                color="textSubtle"
                decimals={2}
                prefix="~"
                value={valueUSDPrice.toNumber()}
                unit=" USD"
              />
            </Flex>
          </Flex>
        )}
        <Flex pt="3px" justifyContent="flex-end">
          {maxAmount?.isGreaterThan(0) &&
            onPercentInput &&
            [25, 50, 75].map((percent) => {
              // let currentPercentAmount;
              // if (percent === 25) currentPercentAmount = percentAmount[25];
              // else if (percent === 50) currentPercentAmount = percentAmount[50];
              // else if (percent === 75) currentPercentAmount = percentAmount[75];

              // const isAtCurrentPercent = maxAmount && value === currentPercentAmount;

              return (
                <Button
                  key={`btn_quickCurrency${percent}`}
                  onClick={() => {
                    onPercentInput(percent);
                  }}
                  scale="xs"
                  mr="5px"
                  // variant={isAtCurrentPercent ? "primary" : "secondary"}
                  variant="primary"
                  style={{ textTransform: "uppercase" }}
                >
                  {percent}%
                </Button>
              );
            })}
          {maxAmount?.isGreaterThan(0) && (
            <>
              <Button
                onClick={onSelectMax}
                scale="xs"
                variant={isAtPercentMax ? "primary" : "secondary"}
                style={{ textTransform: "uppercase" }}
              >
                Max
              </Button>
            </>
          )}
        </Flex>
      </StyledTokenInput>
    </div>
  );
};

export default ModalInput;
