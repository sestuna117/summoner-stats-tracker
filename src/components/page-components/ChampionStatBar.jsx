import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampionStatBar.css";
import ProgressBar from "../ProgressBar";

export default function ChampionStatBar(props) {
  const { id, matchTypes, maxPlayed } = props;
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

  const { kills, deaths, assists, played, wins } = CHAMPION_TOTAL_DATA;
  return (
    <tr className="used-champion-bar">
      <td className="used-champ">
        <img
          className="used-champ-icon"
          src={getChampionIcon(champion.id, dDragon)}
          alt={champion.id}
        />
        <div className="used-champ-name-text">
          <div className="used-champ-name">{champion.name}</div>
          <div className="used-champ-kda">{`${kills} / ${deaths} / ${assists}`}</div>
        </div>
      </td>
      <td className="champ-played">
        <span className="bar-text">{played}</span>
        <ProgressBar progress={played} maxValue={maxPlayed} />
      </td>
      <td className="champ-winrate">
        <span className="bar-text">{((wins / played) * 100).toFixed(1)}%</span>
        <ProgressBar progress={wins} maxValue={played} />
      </td>
    </tr>
  );
}
