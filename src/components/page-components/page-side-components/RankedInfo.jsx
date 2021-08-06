import React, { useEffect, useState } from "react";
import getRankIcon from "../../../util/getRankIcon";
import "./RankedInfo.css";

export default function RankedInfo(props) {
  const { type, data } = props;
  const ranks = getRankIcon;
  const [rankInfo, setRankInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log(data, type);

  async function loadRankInfo() {
    if (!data) {
      return;
    }
    setRankInfo(data?.find((queue) => queue?.queueType === type.id));
  }

  useEffect(() => {
    setIsLoaded(false);

    loadRankInfo();

    setIsLoaded(true);
  }, [data]);

  const getTier = () => {
    if (!rankInfo) {
      return;
    }
    switch (rankInfo?.rank) {
      case "I":
        return ranks.get(rankInfo?.tier)?.tiers.I;
      case "II":
        return ranks.get(rankInfo?.tier)?.tiers.II;
      case "III":
        return ranks.get(rankInfo?.tier)?.tiers.III;
      default:
        return ranks.get(rankInfo?.tier)?.tiers.IV;
    }
  };

  return (
    <div className="ranked-info">
      <div className="rank-icon-container">
        {isLoaded ? (
          !rankInfo ? (
            <img
              className="rank-icon"
              src={ranks.get("UNRANKED")?.tiers.I}
              alt={"Unranked"}
            />
          ) : (
            <img
              className="rank-icon"
              src={getTier()}
              alt={`${ranks.get(rankInfo?.tier)?.name}_${rankInfo?.rank}`}
            />
          )
        ) : (
          "Loading..."
        )}
      </div>
      {!rankInfo ? (
        <div className="ranked-text">
          <p>{type.name}</p>
          <p>Unranked</p>
        </div>
      ) : (
        <div className="ranked-text">
          <p>{type.name}</p>
          <p>{`Winrate: ${parseInt(
            (rankInfo?.wins / (rankInfo?.wins + rankInfo?.losses)) * 100
          )}%`}</p>
          <p>{`${ranks.get(rankInfo?.tier)?.name} ${rankInfo?.rank}`}</p>
          <p>{`${rankInfo?.leaguePoints} LP`}</p>
          <p>{`${rankInfo?.wins}W - ${rankInfo?.losses}L`}</p>
        </div>
      )}
    </div>
  );
}
