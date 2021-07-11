import React from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./FullTeamDetail";
import PlayerBuild from "./player-builds/PlayerBuild";

export default function FullMatchDetail(props) {
  const { participants, TEAM, player, match } = props;

  return (
    <div className="full-match-detail">
      <form className="tabs">
        <input type="radio" id="overview" name="tab" checked="checked" />
        <label for="overview">Overview</label>
        <div className="tab-content">
          {Array.from(participants.entries()).map(([id, participants]) => (
            <FullTeamDetail
              key={id}
              participants={participants}
              id={id}
              TEAM={TEAM}
            />
          ))}
        </div>

        <input type="radio" id="analytics" name="tab" />
        <label for="analytics">Analytics</label>
        <div className="tab-content">
          <div>analytics</div>
        </div>

        <input type="radio" id="builds" name="tab" />
        <label for="builds">Builds</label>
        <div className="tab-content">
          <PlayerBuild match={match} player={player} />
        </div>
      </form>
    </div>
  );
}
