import { Text } from "components/Text";
import { ResponsiveGrid } from "../style";
import { Agent } from "../types";
import { Flex } from "components/Box";
import { getCreditString, getMcapString } from "../utils";
import { NextLinkFromReactRouter } from "components/NextLink";

const DataRow = ({agent, id} : {agent: Agent, id: number}) => {
  return (
    <NextLinkFromReactRouter to={`/token/${agent.id}`}>
      <ResponsiveGrid>
        <Text>{id + 1}</Text>
        <Flex alignItems="center">
          <img src={agent.img} alt="" width="86" style={{borderRadius: "8px"}} />
        </Flex>
        <Text>{getMcapString(agent.mcap)}</Text>
        <Text>{getCreditString(agent.creditUsed)}</Text>
      </ResponsiveGrid>
    </NextLinkFromReactRouter>
  )
}

export default DataRow