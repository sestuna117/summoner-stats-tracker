import React from "react";
import PlayerRunesPage from "./PlayerRunesPage";
import SkillOrder from "./SkillOrder";
import "./PlayerBuild.css";
import ItemTimeline from "./ItemTimeline";

export default function PlayerBuild(props) {
  const { player, match, playersId, timeline } = props;

  return (
    <div className="player-builds">
      <ItemTimeline participantId={playersId} timeline={timeline} />
      <SkillOrder
        player={player}
        participantId={playersId}
        timeline={timeline}
      />
      <PlayerRunesPage key={match.info.gameId} player={player} />
    </div>
  );
}
