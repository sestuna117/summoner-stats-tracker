import React from "react";
import getMatchHistoryIcon from "../../../util/getMatchHistoryIcon";
import "./TeamObjectiveInfo.css";
import getCollectionIcon from "../../../util/getCollectionsIcon";

export default function TeamObjectiveInfo(props) {
  const { id, participants, team } = props;
  let goldTotal = 0;
  let deaths = 0;
  let assists = 0;

  participants.forEach((participant) => {
    goldTotal += participant.goldEarned;
    assists += participant.assists;
    deaths += participant.deaths;
  });

  return (
    <div className="team-objectives">
      <span className="middle-dot">{String.fromCharCode(8226)}</span>
      <span className="objective-score">{goldTotal}</span>
      <span>{String.fromCharCode(8226)}</span>
      <span>{`${team.objectives.champion.kills}/${deaths}/${assists}`}</span>
      <span>{String.fromCharCode(8226)}</span>
      <img
        className="objective-icon"
        src={getMatchHistoryIcon("dragon", -id)}
      />
      <span>{team.objectives.dragon.kills}</span>
      <span>{String.fromCharCode(8226)}</span>
      <img className="objective-icon" src={getMatchHistoryIcon("baron", -id)} />
      <span>{team.objectives.baron.kills}</span>
      <span>{String.fromCharCode(8226)}</span>
      <img className="objective-icon" src={getMatchHistoryIcon("tower", -id)} />
      <span>{team.objectives.tower.kills}</span>
      <img className="objective-icon" src={getCollectionIcon("icon_gold")} />
    </div>
  );
}
