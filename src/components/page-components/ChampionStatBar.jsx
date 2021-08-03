import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampionStatBar.css";
import ProgressBar from "../ProgressBar";

export default function ChampionStatBar(props) {
  const { id, matchTypes, maxPlayed } = props;
  const champData = useContext(ChampionDataContext);
  const dDragon = useContext(DDragonVersionContext);
  console.log(maxPlayed);

  const CHAMPION_TOTAL_DATA = {
    kills: sumUpMatchesData("kills", matchTypes),
    deaths: sumUpMatchesData("deaths", matchTypes),
    assists: sumUpMatchesData("assists", matchTypes),
    played: sumUpMatchesData("played", matchTypes),
    wins: sumUpMatchesData("wins", matchTypes),
  };

  function sumUpMatchesData(stat, matchTypes) {
    let sum = 0;
    matchTypes.forEach((type) => {
      sum += type[stat];
    });
    return sum;
  }

  let champion = Object.values(champData.data).find(
    (champ) => parseInt(champ.key) === id
  );

  const { kills, deaths, assists, played, wins } = CHAMPION_TOTAL_DATA;
  return (
    <div className="used-champion-bar">
      <img
        className="used-champ-icon"
        src={getChampionIcon(champion.id, dDragon)}
        alt={champion.id}
      />
      <div className="used-champ-text">
        <div>
          <div>{champion.name}</div>
          <div>{`${kills} / ${deaths} / ${assists}`}</div>
        </div>
        <div>
          {played}
          <ProgressBar progress={played} maxValue={maxPlayed} />
        </div>
        <div>
          {((wins / played) * 100).toFixed(1)}
          <ProgressBar progress={wins} maxValue={played} />
        </div>
      </div>
    </div>
  );
}
