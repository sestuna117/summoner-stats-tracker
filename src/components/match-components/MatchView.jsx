import React, { useContext, useEffect, useState } from "react";
import "./MatchView.css";
import { ChampionDataContext } from "../../hook";
import ChampSprite from "./ChampSprite";
import PerksSpells from "./PerksSpells";
import ItemsBlock from "./overview/ItemsBlock";
import FullMatchDetail from "./FullMatchDetail";
import Team from "./Team";
import cx from "classnames";

const TEAM = {
  blue: 100,
  red: 200,
};

function MatchView(props) {
  const { match, puuid, region } = props;
  const participants = new Map();
  const champData = useContext(ChampionDataContext);
  const [showFull, setShowFull] = useState(false);
  const [time, setTime] = useState();

  const isRemake = match.info.gameDuration < 5 * 60 * 1000;

  let maxDamage = 0;
  let player;
  match.info.participants.forEach((participant) => {
    if (participant.totalDamageDealtToChampions > maxDamage) {
      maxDamage = participant.totalDamageDealtToChampions;
    }
    if (participant.puuid === puuid) {
      player = participant;
    }
    const teamId = participant.teamId;
    let team = participants.get(teamId);
    if (!team) {
      participants.set(teamId, (team = []));
    }
    team.push(participant);
  });

  // console.log(participants);

  function getGameType() {
    switch (match.info.queueId) {
      case 400:
        return "Normal Draft";
      case 420:
        return "Ranked Solo/Duo";
      case 430:
        return "Normal Blind";
      case 440:
        return "Ranked Flex";
      case 450:
        return "ARAM";
      default:
        return "Customs";
    }
  }

  function calcDuration(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
  }

  function getPlural(amount, singular, plural = `${singular}s`) {
    return amount === 1 ? "a " + singular : amount + " " + plural;
  }

  function calculateTime(millis) {
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const HOURS_IN_DAY = 24;
    const DAYS_IN_MONTH = 30;

    const SECONDS_IN_HOURS = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
    const SECONDS_IN_DAYS = SECONDS_IN_HOURS * HOURS_IN_DAY;
    const SECONDS_IN_MONTH = SECONDS_IN_DAYS * DAYS_IN_MONTH;

    let timestamp = Math.abs(Date.now() - millis) / 1000;

    const months = Math.floor(timestamp / SECONDS_IN_MONTH);
    timestamp -= months * SECONDS_IN_MONTH;
    const days = Math.floor(timestamp / SECONDS_IN_DAYS) % DAYS_IN_MONTH;
    timestamp -= days * SECONDS_IN_DAYS;
    const hours = Math.floor(timestamp / SECONDS_IN_HOURS) % HOURS_IN_DAY;
    timestamp -= hours * SECONDS_IN_HOURS;
    const minutes = Math.floor(timestamp / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR;
    timestamp -= minutes * SECONDS_IN_MINUTE;
    const seconds = Math.floor(timestamp % SECONDS_IN_MINUTE);

    if (months > 0) {
      return getPlural(months, "month") + " ago";
    } else if (days > 0) {
      return getPlural(days, "day") + " ago";
    } else if (hours > 0) {
      return getPlural(hours, "hr") + " ago";
    } else if (minutes > 0) {
      return (
        (seconds > 0
          ? minutes + "m " + seconds + "s "
          : getPlural(minutes, "min")) + " ago"
      );
    } else {
      return getPlural(seconds, "second") + " ago";
    }
  }

  function loadTime() {
    const timeMsg = calculateTime(
      match.info.gameStartTimestamp + match.info.gameDuration
    );
    setTime(timeMsg);
  }

  useEffect(() => {
    loadTime();
  }, []);

  function displayFullData() {
    setShowFull((prev) => !prev);
  }

  return (
    <li className="match">
      <div className="main-match-data">
        <div className="match-details">
          <p className="bold">{getGameType()}</p>
          <p className="match-duration">{time}</p>
          <p
            className={cx("match-result", {
              "match-win": player.win,
              "match-lost": !player.win,
            })}
          >
            {isRemake ? "Remake" : player.win ? "Victory" : "Defeat"}
          </p>
          <p className="match-duration">
            {calcDuration(match.info.gameDuration)}
          </p>
        </div>
        <div className="chosen-sum-options">
          <ChampSprite participant={player} isPlayer={true} />
          <PerksSpells participant={player} />
        </div>
        <div className="kda-info">
          <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
          <p className="kda-subtext">
            {player.kills + player.assists === 0
              ? "0.00:1"
              : isFinite((player.kills + player.assists) / player.deaths)
              ? ((player.kills + player.assists) / player.deaths).toFixed(2) +
                ":1"
              : "Perfect"}{" "}
            KDA
          </p>
        </div>
        <div className="macro-info">
          <p>Level {player?.champLevel}</p>
          <p>{player.totalMinionsKilled + player.neutralMinionsKilled} CS</p>
          <p className="kp-text">
            {isFinite(
              (player.kills + player.assists) /
                match.info.teams.find((team) => team.teamId === player.teamId)
                  .objectives.champion.kills
            )
              ? `${(
                  ((player.kills + player.assists) /
                    match.info.teams.find(
                      (team) => team.teamId === player.teamId
                    ).objectives.champion.kills) *
                  100
                ).toFixed(1)} `
              : "0.0 "}
            KP%
          </p>
        </div>
        <div className="players-items">
          <ItemsBlock participant={player} isPlayer={true} />
        </div>
        <div className="main-match-right">
          <div className="main-match-teams">
            {Array.from(participants.entries()).map(([id, participants]) => (
              <Team
                key={id}
                participants={participants}
                id={id}
                champData={champData}
                TEAM={TEAM}
              />
            ))}
          </div>
          <button
            className="dropdown-match-button"
            type={"button"}
            onClick={displayFullData}
          >
            Display
          </button>
        </div>
      </div>
      <FullMatchDetail
        participants={participants}
        display={showFull}
        TEAM={TEAM}
        player={player}
        match={match}
        region={region}
        maxDamage={maxDamage}
      />
    </li>
  );
}

export default MatchView;
