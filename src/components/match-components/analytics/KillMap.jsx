import React, { useContext, useEffect, useState } from "react";
import { DDragonVersionContext } from "../../../hook";
import getMap from "../../../util/getMap";
import "./KillMap.css";
import KillMapScatterChart from "./KillMapScatterChart";
import ChampSprite from "../ChampSprite";

export default function KillMap(props) {
  const { killData, teamSides, map, participants } = props;
  const [killMap, setKillMap] = useState();
  const dDragon = useContext(DDragonVersionContext);
  const backgroundMap = {
    backgroundImage: `url(${getMap(map, dDragon)})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  function loadKillMap() {
    if (!killData || !teamSides) {
      return;
    }
    const killLocations = killData.map(
      ({ position, killerId, victimId, timestamp }) => {
        let killer;
        let killChamp;
        let victim;
        let victChamp;
        let team;

        let inBlueTeam = teamSides[0].find(
          (player) => player.participantId === killerId
        );

        if (inBlueTeam) {
          let inRedTeam = teamSides[1].find(
            (player) => player.participantId === victimId
          );

          team = "blue";
          killer = inBlueTeam.summonerName;
          killChamp = inBlueTeam.championId;
          victim = inRedTeam.summonerName;
          victChamp = inRedTeam.championId;
        } else {
          let inRedTeam = teamSides[1].find(
            (player) => player.participantId === killerId
          );
          if (inRedTeam) {
            inBlueTeam = teamSides[0].find(
              (player) => player.participantId === victimId
            );

            team = "red";
            killer = inRedTeam.summonerName;
            killChamp = inRedTeam.championId;
            victim = inBlueTeam.summonerName;
            victChamp = inBlueTeam.championId;
          }
        }

        return {
          x: position.x,
          y: position.y,
          z: 50,
          team: team,
          killer: { sumName: killer, championId: killChamp },
          victim: { sumName: victim, championId: victChamp },
          timestamp: timestamp,
        };
      }
    );
    setKillMap(killLocations);
  }

  useEffect(() => {
    loadKillMap();
  }, [killData, teamSides]);

  return (
    <div className="kill-map-box">
      <div className="kill-map-info">
        <div className="icon-row">
          {participants.get(100).map((participant, index) => (
            <ChampSprite key={index} participant={participant} />
          ))}
        </div>
        <div className="kill-map-container">
          <div className="kill-map" style={backgroundMap} />
          <KillMapScatterChart killData={killMap} mapId={map} />
        </div>
        <div className="icon-row">
          {participants.get(200).map((participant, index) => (
            <ChampSprite key={index} participant={participant} />
          ))}
        </div>
      </div>
    </div>
  );
}
