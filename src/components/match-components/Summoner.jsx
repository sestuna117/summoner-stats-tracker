import React from "react";
import "./Summoner.css";
import ChampSprite from "./ChampSprite";

export default function Summoner(props) {
  const { participant } = props;

  return (
    <div className="summoner">
      <ChampSprite participant={participant} />
      <div className="sum-name">{participant.summonerName}</div>
    </div>
  );
}
