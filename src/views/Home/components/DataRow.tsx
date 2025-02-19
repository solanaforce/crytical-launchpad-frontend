import { Text } from "components/Text";
import { Flex } from "components/Box";
import { NextLinkFromReactRouter } from "components/NextLink";
import { ResponsiveGrid } from "../style";
import { Agent } from "../types";
import { getCreditString, getMcapString } from "../utils";

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