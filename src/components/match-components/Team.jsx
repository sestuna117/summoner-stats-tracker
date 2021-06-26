import React from "react";
import cx from "classnames";
import "./Team.css";
import Summoner from "./Summoner";

export default function Team(props) {
  const { participants, id, TEAM } = props;
  const isBlue = id === TEAM.blue;

  return (
    <ul className={cx("team", { "team-blue": isBlue, "team-red": !isBlue })}>
      {participants.map((participant) => (
        <li className="team-member" key={participant.puuid}>
          <Summoner participant={participant} />
        </li>
      ))}
    </ul>
  );
}
