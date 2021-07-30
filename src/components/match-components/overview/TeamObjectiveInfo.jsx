import React from "react";
import getMatchHistoryIcon from "../../../util/getMatchHistoryIcon";
import "./TeamObjectiveInfo.css";
import getCollectionIcon from "../../../util/getCollectionsIcon";
import cx from "classnames";

export default function TeamObjectiveInfo(props) {
  const { id, participants, team, isBlue, isRemake } = props;
  let goldTotal = 0;
  let deaths = 0;
  let assists = 0;

  participants.forEach((participant) => {
    goldTotal += participant.goldEarned;
    assists += participant.assists;
    deaths += participant.deaths;
  });

  const { baron, dragon, champion, tower } = team.objectives;

  const OBJECTIVE_DATA = [
    {
      name: "kda",
      img: getMatchHistoryIcon("kills", ""),
      data: `${champion.kills}/${deaths}/${assists}`,
    },
    {
      name: "gold",
      img: getCollectionIcon("icon_gold"),
      data: goldTotal,
    },
    {
      name: "dragon",
      img: getMatchHistoryIcon("dragon", -id),
      data: dragon.kills,
    },
    {
      name: "baron",
      img: getMatchHistoryIcon("baron", -id),
      data: baron.kills,
    },
    {
      name: "tower",
      img: getMatchHistoryIcon("tower", -id),
      data: tower.kills,
    },
  ];

  return (
    <div className="team-objectives">
      <span
        className={cx("match-result", {
          "match-win": team.win,
          "match-lost": !team.win,
        })}
      >
        {isRemake ? "" : team.win ? "Victory" : "Defeat"}
      </span>
      <span className="match-team">{isBlue ? "Blue" : "Red"} Team</span>
      <div>
        {OBJECTIVE_DATA.map((objective) => (
          <div
            key={objective.name}
            className="inline-section objective-container"
          >
            <span>{String.fromCharCode(8226)}</span>
            <img
              className="objective-icon"
              src={objective.img}
              alt={objective.name}
            />
            <span className="objective-score">{objective.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
