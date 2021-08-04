import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampionStatBar.css";
import ProgressBar from "../ProgressBar";

export default function ChampionStatBar(props) {
  const { id, matchTypes, maxPlayed } = props;
  const champData = useContext(ChampionDataContext);
  const dDragon = useContext(DDragonVersionContext);

  let champion = Object.values(champData.data).find(
    (champ) => parseInt(champ.key) === id
  );

  const { kills, deaths, assists, played, wins } = matchTypes;
  return played !== 0 ? (
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
  ) : null;
}
