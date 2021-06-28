import React from "react";
import "./Summoner.css";
import ChampSprite from "./ChampSprite";
import { Link } from "react-router-dom";
import useQuery from "../../util/useQuery";

export default function Summoner(props) {
  const { participant } = props;
  const query = useQuery();
  const region = query.get("region");

  return (
    <div className="summoner">
      <ChampSprite participant={participant} />
      <div className="sum-name-container">
        <Link
          className="sum-name"
          to={{ search: `?name=${participant.summonerName}&region=${region}` }}
          target="_blank"
        >
          {participant.summonerName}
        </Link>
      </div>
    </div>
  );
}
