import React from "react";
import PlayerRunesPage from "./PlayerRunesPage";
import SkillOrder from "./SkillOrder";
import "./PlayerBuild.css";

export default function PlayerBuild(props) {
  const { player, match } = props;

  return (
    <div className="player-builds">
      <div className="item-purchase-timeline"></div>
      <SkillOrder player={player} />
      <PlayerRunesPage key={match.info.gameId} player={player} />
    </div>
  );
}
