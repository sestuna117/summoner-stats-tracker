import React from "react";
import ProgressBar from "../../ProgressBar";
import "./StatBar.css";
import "./PlayerStatBar.css";

export default function PlayerStatBar(props) {
  const { playerStats, maxPlayed } = props;
  const { name, played, wins, winrate } = playerStats;

  return played !== 0 ? (
    <tr className="played-with-bar">
      <td className="played-with-player">
        <div className="played-with-name">{name}</div>
      </td>
      <td className="progress-played">
        <span className="bar-text">{played}</span>
        <ProgressBar progress={played} maxValue={maxPlayed} />
      </td>
      <td className="progress-winrate">
        <span className="bar-text">{winrate.toFixed(1)}%</span>
        <ProgressBar progress={wins} maxValue={played} />
      </td>
    </tr>
  ) : null;
}
