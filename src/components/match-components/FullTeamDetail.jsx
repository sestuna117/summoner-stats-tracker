import React from "react";
import cx from "classnames";
import "./FullTeamDetail.css";
import ChampSprite from "./ChampSprite";
import PerksSpells from "./PerksSpells";
import ItemsBlock from "./ItemsBlock";

export default function FullTeamDetail(props) {
  const { id, participants, TEAM } = props;
  const isBlue = id === TEAM.blue;

  return (
    <table
      className={cx("full-data-table", {
        "table-blue": isBlue,
        "table-red": !isBlue,
      })}
    >
      <thead>
        <tr className="data-header">
          <th className="header-cell">{`${isBlue ? "Blue" : "Red"} Team`}</th>
          <th className="header-cell">KDA</th>
          <th className="header-cell">Vision</th>
          <th className="header-cell">CS</th>
          <th className="header-cell">Item</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant) => (
          <tr className="data-row" key={participant.puuid}>
            <td>
              <div className="chosen-options-name">
                <div className="chosen-sum-options">
                  <ChampSprite
                    participant={participant}
                    isPlayer={false}
                    isTeamDetail={true}
                  />
                  <PerksSpells participant={participant} isTeamDetail={true} />
                </div>
                <div className="sum-name-container">
                  <p className="sum-name">{participant.summonerName}</p>
                </div>
              </div>
            </td>
            <td>{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</td>
            <td>{participant.visionScore}</td>
            <td>
              {participant.totalMinionsKilled +
                participant.neutralMinionsKilled}
            </td>
            <td>
              <ItemsBlock participant={participant} isPlayer={false} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
