import React, { useState } from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./FullTeamDetail";
import PlayerBuild from "./PlayerBuild";

export default function FullMatchDetail(props) {
  const { participants, TEAM, player, match } = props;

  return (
    <div className="full-match-detail">
      <div className="tab-bar">
        <div className="tab">Overview</div>
        <div className="tab">Analytics</div>
        <div className="tab">Builds</div>
      </div>
      {Array.from(participants.entries()).map(([id, participants]) => (
        <FullTeamDetail
          key={id}
          participants={participants}
          id={id}
          TEAM={TEAM}
        />
      ))}
      <div>
        <PlayerBuild match={match} player={player} />
      </div>
    </div>
  );
}
