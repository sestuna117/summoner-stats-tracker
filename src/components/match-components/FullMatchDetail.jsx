import React, { useEffect, useState } from "react";
import "./FullMatchDetail.css";
import FullTeamDetail from "./overview/FullTeamDetail";
import PlayerBuild from "./player-builds/PlayerBuild";
import MatchAnalytics from "./analytics/MatchAnalytics";
import cx from "classnames";
import { getMatchTimeline } from "../../api/services/request.services";

export default function FullMatchDetail(props) {
  const {
    participants,
    TEAM,
    player,
    match,
    display,
    region,
    maxDamage,
    isRemake,
  } = props;
  const [activeTab, setActiveTab] = useState("overview");
  const [playersId, setPlayersId] = useState();
  const [timeline, setTimeline] = useState();

  async function loadTimeline() {
    const result = await getMatchTimeline(match.metadata.matchId, region);
    setTimeline(result);
    let participantId;
    const players = result.info.participants;
    if (!players) {
      participantId = result.metadata.participants.indexOf(player.puuid) + 1;
    } else {
      participantId = players.find(
        (participant) => participant.puuid === player.puuid
      ).participantId;
    }
    setPlayersId(participantId);
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  return display ? (
    <div className={"full-match-detail"}>
      <form className="tabs">
        <button
          className={cx("tab", {
            "tab-open": activeTab === "overview",
          })}
          type="button"
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={cx("tab", {
            "tab-open": activeTab === "analytics",
          })}
          type="button"
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>

        <button
          className={cx("tab", {
            "tab-open": activeTab === "builds",
          })}
          type="button"
          onClick={() => setActiveTab("builds")}
        >
          Builds
        </button>
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
            team={match.info.teams.find((team) => team.teamId === id)}
            id={id}
            duration={match.info.gameDuration}
            TEAM={TEAM}
            maxDamage={maxDamage}
            isRemake={isRemake}
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
  ) : null;
}
