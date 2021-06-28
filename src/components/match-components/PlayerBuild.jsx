import React from "react";
import PlayerRunesPage from "./PlayerRunesPage";

export default function PlayerBuild(props) {
  const { player, match } = props;

  return (
    <div className="player-builds">
      <div className="item-purchase-timeline"></div>
      <div className="skill-order"></div>
      <PlayerRunesPage key={match.info.gameId} player={player} />
    </div>
  );
}
