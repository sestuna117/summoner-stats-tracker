import React, { useEffect, useState } from "react";
import getRankIcon from "../../util/getRankIcon";
import { getRankedInfo } from "../../api/services/request.services";
import "./RankedInfo.css";

export default function RankedInfo(props) {
  const { data } = props;
  const [rankData, setRankData] = useState();
  const ranks = getRankIcon;
  const [soloInfo, setSoloInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadRankedInfo() {
    try {
      const result = await getRankedInfo(data.name);
      setRankData(result);
      console.log(result);
      if (result.length !== 0) {
        setSoloInfo(
          result?.find((queue) => queue?.queueType === "RANKED_SOLO_5x5")
        );
      } else {
        setSoloInfo(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsLoaded(false);

    loadRankedInfo();

    setIsLoaded(true);
  }, [data?.id]);

  const getTier = () => {
    switch (soloInfo?.rank) {
      case "I":
        return ranks.get(soloInfo?.tier)?.tiers.I;
      case "II":
        return ranks.get(soloInfo?.tier)?.tiers.II;
      case "III":
        return ranks.get(soloInfo?.tier)?.tiers.III;
      default:
        return ranks.get(soloInfo?.tier)?.tiers.IV;
    }
  };

  if (soloInfo === undefined) {
    return (
      <div className="ranked-info">
        <div className="rank-icon-container">
          {isLoaded ? (
            <img
              className="rank-icon"
              src={ranks.get("UNRANKED")?.tiers.I}
              alt={"Unranked"}
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div className="ranked-text">
          <p>Ranked Solo</p>
          <p>Unranked</p>
        </div>
      </div>
    );
  } else {
    return isLoaded ? (
      <div className="ranked-info">
        <div className="rank-icon-container">
          <img
            className="rank-icon"
            src={getTier()}
            alt={`${ranks.get(soloInfo?.tier)?.name}_${soloInfo?.rank}`}
          />
        </div>
        <div className="ranked-text">
          <p>Ranked Solo</p>
          <p>{`Winrate: ${parseInt(
            (soloInfo?.wins / (soloInfo?.wins + soloInfo?.losses)) * 100
          )}%`}</p>
          <p>{`${ranks.get(soloInfo?.tier)?.name} ${soloInfo?.rank}`}</p>
          <p>{`${soloInfo?.leaguePoints} LP`}</p>
          <p>{`${soloInfo?.wins}W - ${soloInfo?.losses}L`}</p>
        </div>
      </div>
    ) : null;
  }
}
