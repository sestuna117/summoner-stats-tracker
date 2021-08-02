import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampionStatBar.css";

export default function ChampionStatBar(props) {
  const { id, matchTypes } = props;
  const champData = useContext(ChampionDataContext);
  const dDragon = useContext(DDragonVersionContext);

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

  return (
    <div className="used-champion-bar">
      <div>
        <img
          className="used-champ-icon"
          src={getChampionIcon(champion.id, dDragon)}
          alt={champion.id}
        />
      </div>
      <div>KDA</div>
      <div>KDA-Sub</div>
      <div>Played</div>
      <div>Winrate</div>
    </div>
  );
}
