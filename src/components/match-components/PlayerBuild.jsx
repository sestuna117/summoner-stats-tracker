import React, { useEffect, useState } from "react";
import PlayerRunesPage from "./PlayerRunesPage";
import SkillOrder from "./SkillOrder";
import "./PlayerBuild.css";
import { getMatchTimeline } from "../../api/services/request.services";

export default function PlayerBuild(props) {
  const { player, match } = props;
  const [playersId, setPlayersId] = useState();
  const [timeline, setTimeline] = useState();

  async function loadTimeline() {
    const result = await getMatchTimeline(match.metadata.matchId);
    setTimeline(result);
    console.log(result);
    const { participantId } = result.info.participants.find(
      (participant) => participant.puuid === player.puuid
    );
    console.log(participantId);
    setPlayersId(participantId);
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  return (
    <div className="player-builds">
      <div className="item-purchase-timeline"></div>
      <SkillOrder
        player={player}
        participantId={playersId}
        timeline={timeline}
      />
      <PlayerRunesPage key={match.info.gameId} player={player} />
    </div>
  );
}
