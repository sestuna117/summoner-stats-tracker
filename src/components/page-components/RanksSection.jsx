import React, { useEffect, useState } from "react";
import { getRankedInfo } from "../../api/services/request.services";
import RankedInfo from "./RankedInfo";

const RANKED_TYPES = [
  { name: "Ranked Solo", id: "RANKED_SOLO_5x5" },
  { name: "Ranked Flex", id: "RANKED_FLEX_SR" },
];

export default function RanksSection(props) {
  const { data, region } = props;
  const [rankData, setRankData] = useState();
  console.log(data, region);

  async function loadRankedInfo() {
    try {
      const result = await getRankedInfo(data.name, region);
      setRankData(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadRankedInfo();
  }, [data, region]);

  return (
    <div>
      {RANKED_TYPES.map((type) => (
        <RankedInfo key={type} type={type} data={rankData} />
      ))}
    </div>
  );
}
