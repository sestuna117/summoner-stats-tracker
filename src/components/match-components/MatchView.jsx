import React, { useContext, useState } from "react";
import "./MatchView.css";
import { ChampionDataContext } from "../../hook";
import ChampSprite from "./ChampSprite";
import PerksSpells from "./PerksSpells";
import ItemsBlock from "./overview/ItemsBlock";
import FullMatchDetail from "./FullMatchDetail";
import Team from "./Team";

const TEAM = {
  blue: 100,
  red: 200,
};

function MatchView(props) {
  const { match, puuid, region } = props;
  const participants = new Map();
  const champData = useContext(ChampionDataContext);
  const [showFull, setShowFull] = useState(false);

  let player;
  match.info.participants.forEach((participant) => {
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
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
  }

  function displayFullData() {
    setShowFull((prev) => !prev);
  }

  return (
    <li className="match">
      <div className="main-match-data">
        <div className="match-details">
          {getGameType()}
          <p>{calcDuration(match.info.gameDuration)}</p>
          <p>{player.win ? "Victory" : "Defeat"}</p>
        </div>
        <div className="chosen-sum-options">
          <ChampSprite participant={player} isPlayer={true} />
          <PerksSpells participant={player} />
        </div>
        <div className="kda-info">
          <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
          <p className="kda-subtext">
            {isFinite((player.kills + player.assists) / player.deaths)
              ? ((player.kills + player.assists) / player.deaths).toFixed(2) +
                ":1"
              : "Perfect"}{" "}
            KDA
          </p>
        </div>
        <div className="macro-info">
          <p>Level {player?.champLevel}</p>
          <p>{player.totalMinionsKilled + player.neutralMinionsKilled} CS</p>
          <p>
            {(
              ((player.kills + player.assists) /
                match.info.teams.find((team) => team.teamId === player.teamId)
                  .objectives.champion.kills) *
              100
            ).toFixed(1)}{" "}
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
      />
    </li>
  );
}

export default MatchView;
