import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampionStatBar.css";
import ProgressBar from "../ProgressBar";

export default function ChampionStatBar(props) {
  const { champStats, maxPlayed } = props;
  const champData = useContext(ChampionDataContext);
  const dDragon = useContext(DDragonVersionContext);
  const { kills, deaths, assists, played, wins, winrate, id } = champStats;

  let champion = Object.values(champData.data).find(
    (champ) => parseInt(champ.key) === id
  );

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
          <div className="used-champ-k/d/a">
            <span className="used-champ-k">{kills}</span>
            {" / "}
            <span className="used-champ-d">{deaths}</span>
            {" / "}
            <span className="used-champ-a">{assists}</span>
          </div>
          <div className="used-champ-kda">
            {kills + assists === 0
              ? "0.00:1"
              : isFinite((kills + assists) / deaths)
              ? ((kills + assists) / deaths).toFixed(2) + ":1"
              : "Perfect"}{" "}
            KDA
          </div>
        </div>
      </td>
      <td className="champ-played">
        <span className="bar-text">{played}</span>
        <ProgressBar progress={played} maxValue={maxPlayed} />
      </td>
      <td className="champ-winrate">
        <span className="bar-text">{winrate.toFixed(1)}%</span>
        <ProgressBar progress={wins} maxValue={played} />
      </td>
    </tr>
  ) : null;
}
