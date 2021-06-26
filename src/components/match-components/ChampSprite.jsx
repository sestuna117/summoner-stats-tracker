import React, { useContext } from "react";
import { ChampionDataContext, DDragonVersionContext } from "../../hook";
import getChampionIcon from "../../util/getChampionIcon";
import "./ChampSprite.css";

export default function ChampSprite(props) {
  const dDragon = useContext(DDragonVersionContext);
  const champData = useContext(ChampionDataContext);
  const { participant, isPlayer, isTeamDetail } = props;

  let champId = Object.values(champData.data).find(
    (champ) => parseInt(champ.key) === participant?.championId
  );

  return (
    <img
      className={`${
        isPlayer
          ? "player-sprite"
          : isTeamDetail
          ? "team-sprite"
          : "champ-sprite"
      }`}
      src={getChampionIcon(champId.id, dDragon)}
      alt={`${champId.id}`}
    />
  );
}
