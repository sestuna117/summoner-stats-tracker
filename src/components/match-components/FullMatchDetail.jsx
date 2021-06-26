import React from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./FullTeamDetail";

export default function FullMatchDetail(props) {
  const { participants, TEAM } = props;

  return (
    <div className="full-match-detail">
      <div className="tab-bar">
        <div className="tab">Overview</div>
        <div className="tab">Analytics</div>
        <div className="tab">Build</div>
      </div>
      {Array.from(participants.entries()).map(([id, participants]) => (
        <FullTeamDetail
          key={id}
          participants={participants}
          id={id}
          TEAM={TEAM}
        />
      ))}
    </div>
  );
}
