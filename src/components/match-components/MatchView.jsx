import React, { useContext, useState } from "react";
import "./MatchView.css";
import { ChampionDataContext } from "../../hook";
import ChampSprite from "./ChampSprite";
import PerksSpells from "./PerksSpells";
import ItemsBlock from "./ItemsBlock";
import FullMatchDetail from "./FullMatchDetail";
import Team from "./Team";

const TEAM = {
  blue: 100,
  red: 200,
};

function MatchView(props) {
  const { match, puuid } = props;
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
  console.log(participants);

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

  function displayFullData() {
    setShowFull((prev) => !prev);
  }

  return (
    <li className="match">
      <div className="main-match-data">
        <div className="match-details">
          {getGameType()}
          <p>Time placeholder</p>
          <p>{player.win ? "Victory" : "Defeat"}</p>
        </div>
        <div className="chosen-sum-options">
          <ChampSprite participant={player} isPlayer={true} />
          <PerksSpells participant={player} />
        </div>
        <div className="kda-info">
          <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
        </div>
        <div className="macro-info">
          <p>Level {player?.champLevel}</p>
          <p>{player.totalMinionsKilled + player.neutralMinionsKilled} CS</p>
          <p>
            {player.kills + player.assists}{" "}
            {match.info.teams[0].objectives.champion.kills} KP%
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
      {showFull ? (
        <FullMatchDetail
          participants={participants}
          TEAM={TEAM}
          player={player}
          match={match}
        />
      ) : null}
    </li>
  );
}

export default MatchView;
