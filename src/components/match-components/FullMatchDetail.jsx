import React, { useState } from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./overview/FullTeamDetail";
import PlayerBuild from "./player-builds/PlayerBuild";
import MatchAnalytics from "./analytics/MatchAnalytics";
import cx from "classnames";

export default function FullMatchDetail(props) {
  const { participants, TEAM, player, match } = props;
  const [activeTab, setActiveTab] = useState("overview");

  const onRadioChange = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div className="full-match-detail">
      <form className="tabs">
        <input
          type="radio"
          id="overview"
          name="tab"
          checked={activeTab === "overview"}
          onChange={onRadioChange}
        />
        <label for="overview">Overview</label>
        <div
          className={cx("tab-content", {
            "active-tab": activeTab === "overview",
          })}
        >
          {Array.from(participants.entries()).map(([id, participants]) => (
            <FullTeamDetail
              key={id}
              participants={participants}
              id={id}
              TEAM={TEAM}
            />
          ))}
        </div>

        <input
          type="radio"
          id="analytics"
          name="tab"
          checked={activeTab === "analytics"}
          onChange={onRadioChange}
        />
        <label for="analytics">Analytics</label>
        <div
          className={cx("tab-content", {
            "active-tab": activeTab === "analytics",
          })}
        >
          <MatchAnalytics participants={participants} TEAM={TEAM} />
        </div>

        <input
          type="radio"
          id="builds"
          name="tab"
          checked={activeTab === "builds"}
          onChange={onRadioChange}
        />
        <label for="builds">Builds</label>
        <div
          className={cx("tab-content", {
            "active-tab": activeTab === "builds",
          })}
        >
          <PlayerBuild match={match} player={player} />
        </div>
      </form>
    </div>
  );
}
