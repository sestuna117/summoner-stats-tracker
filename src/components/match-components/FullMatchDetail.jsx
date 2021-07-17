import React, { useEffect, useState } from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./overview/FullTeamDetail";
import PlayerBuild from "./player-builds/PlayerBuild";
import MatchAnalytics from "./analytics/MatchAnalytics";
import cx from "classnames";
import { getMatchTimeline } from "../../api/services/request.services";

export default function FullMatchDetail(props) {
  const { participants, TEAM, player, match, display } = props;
  const [activeTab, setActiveTab] = useState("overview");
  const [playersId, setPlayersId] = useState();
  const [timeline, setTimeline] = useState();

  async function loadTimeline() {
    const result = await getMatchTimeline(match.metadata.matchId);
    setTimeline(result);
    console.log(result);
    const { participantId } = result.info.participants.find(
      (participant) => participant.puuid === player.puuid
    );
    setPlayersId(participantId);
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  const onRadioChange = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div
      className={cx("full-match-detail", { "match-detail-opened": display })}
    >
      <form className="tabs">
        <input
          type="radio"
          id="overview"
          name="tab"
          checked={activeTab === "overview"}
          onChange={onRadioChange}
        />
        <label htmlFor="overview">Overview</label>

        <input
          type="radio"
          id="analytics"
          name="tab"
          checked={activeTab === "analytics"}
          onChange={onRadioChange}
        />
        <label htmlFor="analytics">Analytics</label>

        <input
          type="radio"
          id="builds"
          name="tab"
          checked={activeTab === "builds"}
          onChange={onRadioChange}
        />
        <label htmlFor="builds">Builds</label>
      </form>
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
      <div
        className={cx("tab-content", {
          "active-tab": activeTab === "analytics",
        })}
      >
        <MatchAnalytics
          participants={participants}
          match={match.info}
          timeline={timeline}
        />
      </div>
      <div
        className={cx("tab-content", {
          "active-tab": activeTab === "builds",
        })}
      >
        <PlayerBuild
          match={match}
          player={player}
          playersId={playersId}
          timeline={timeline}
        />
      </div>
    </div>
  );
}
