import React, { useEffect, useState } from "react";
import useQuery from "../../../util/useQuery";
import { getRankedInfo } from "../../../api/services/request.services";
import getRankIcon from "../../../util/getRankIcon";

export default function TierDetail(props) {
  const { name } = props;
  const [rank, setRank] = useState();

  // const ranks = getRankIcon;
  // const query = useQuery(); // Query parameters (the bit after ? in URL)
  // const region = query.get("region") ?? "na1";
  //
  // useEffect(async () => {
  //   const result = await getRankedInfo(name, region);
  //   console.log(result);
  //   console.log(
  //     result?.find((queue) => queue?.queueType === "RANKED_SOLO_5x5")
  //   );
  //   setRank(result?.find((queue) => queue?.queueType === "RANKED_SOLO_5x5"));
  // }, []);

  return (
    <div>
      <span>
        {/*{rank ? `${ranks.get(rank?.tier)?.name} ${rank?.rank}` : "Unranked"}*/}
      </span>
    </div>
  );
}
