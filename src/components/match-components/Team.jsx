import React from "react";
import cx from "classnames";
import "./Team.css";
import Summoner from "./Summoner";

export default function Team(props) {
  const { participants, id, TEAM } = props;
  const isBlue = id === TEAM.blue;
  let index = 1;

  return (
    <ul className={cx("team", { "team-blue": isBlue, "team-red": !isBlue })}>
      {participants.map((participant) => {
        let id = participant.puuid;
        if (id === "BOT") {
          id = id + index;
          index++;
        }

        return (
          <li className="team-member" key={id}>
            <Summoner participant={participant} />
          </li>
        );
      })}
    </ul>
  );
}
