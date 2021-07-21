import React, { useEffect, useState } from "react";
import "./MatchAnalytics.css";
import cx from "classnames";
import TeamAnalytics from "./TeamAnalytics";
import AdvantageGraphs from "./AdvantageGraphs";
import StatsTable from "./StatsTable";
import KillMap from "./KillMap";

export default function MatchAnalytics(props) {
  const { participants, match, timeline } = props;
  const [activeTab, setActiveTab] = useState("team-analytics");
  const [rolePairs, setRolePairs] = useState(new Map());
  const [teamSides, setTeamSides] = useState();
  const [killData, setKillData] = useState();

  function loadKills() {
    if (!timeline) {
      return;
    }

    const MINUTE = 60 * 1000;
    const playerEvents = timeline.info.frames
      .flatMap((frame) =>
        frame.events.filter((event) => event.type === "CHAMPION_KILL")
      )
      .map((event) => ({
        killerId: event.killerId,
        victimId: event.victimId,
        timestamp: Math.round(event.timestamp / MINUTE),
        position: event.position,
      }));
    setKillData(playerEvents);
  }

  useEffect(() => {
    loadKills();
  }, [timeline]);

  function loadTeamSides() {
    if (!timeline || !participants) {
      return;
    }
    const participantTeams = Array.from(participants.values());
    const teamMap = [[], []];
    timeline.info.participants.forEach((participant) => {
      let player = participantTeams[0].find(
        (player) => participant.puuid === player.puuid
      );
      if (!player) {
        player = participantTeams[1].find(
          (player) => participant.puuid === player.puuid
        );
        teamMap[1].push({
          participantId: participant.participantId,
          puuid: participant.puuid,
          championId: player.championId,
          summonerName: player.summonerName,
        });
      } else {
        teamMap[0].push({
          participantId: participant.participantId,
          puuid: participant.puuid,
          championId: player.championId,
          summonerName: player.summonerName,
        });
      }
    });
    setTeamSides(teamMap);
  }

  useEffect(() => {
    loadTeamSides();
  }, [participants, timeline]);

  function loadPairs() {
    const pairs = new Map();
    const teams = Array.from(participants.values());
    teams[0].forEach((member, index) => {
      pairs.set(index, [member, teams[1][index]]);
    });
    setRolePairs(pairs);
  }

  useEffect(() => {
    loadPairs();
  }, []);

  const onRadioChange = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div>
      <form className="tabs sub-tabs data-header">
        <button
          className={cx({
            "sub-tab-open": activeTab === "team-analytics",
          })}
          type="button"
          onClick={() => setActiveTab("team-analytics")}
        >
          Team Analytics
        </button>

        <button
          className={cx({
            "sub-tab-open": activeTab === "gold-kill",
          })}
          type="button"
          onClick={() => setActiveTab("gold-kill")}
        >
          Advantage Graphs
        </button>

        <button
          className={cx({
            "sub-tab-open": activeTab === "kill-map",
          })}
          type="button"
          onClick={() => setActiveTab("kill-map")}
        >
          Kill Map
        </button>

        <button
          className={cx({
            "sub-tab-open": activeTab === "stats-table",
          })}
          type="button"
          onClick={() => setActiveTab("stats-table")}
        >
          Stats Table
        </button>
      </form>

      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "team-analytics",
        })}
      >
        <TeamAnalytics participants={participants} rolePairs={rolePairs} />
      </div>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "gold-kill",
        })}
      >
        <AdvantageGraphs
          timeline={timeline}
          teamSides={teamSides?.map((team) =>
            team.map((player) => player.participantId)
          )}
          killData={killData}
        />
      </div>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "kill-map",
        })}
      >
        <KillMap
          killData={killData}
          teamSides={teamSides}
          map={match.mapId}
          participants={participants}
        />
      </div>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "stats-table",
        })}
      >
        <StatsTable match={match} />
      </div>
    </div>
  );
}
