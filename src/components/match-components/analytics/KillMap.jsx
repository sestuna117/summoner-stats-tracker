import React, { useContext, useEffect, useState } from "react";
import { DDragonVersionContext } from "../../../hook";
import getMap from "../../../util/getMap";
import "./KillMap.css";
import KillMapScatterChart from "./KillMapScatterChart";

export default function KillMap(props) {
  const { killData, teamSides, map } = props;
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
        let victim;
        let team;
        let inBlueTeam = teamSides[0].find(
          (player) => player.participantId === killerId
        );
        let inRedTeam = teamSides[1].find(
          (player) => player.participantId === killerId
        );
        if (inBlueTeam) {
          team = "blue";
          killer = inBlueTeam.puuid;
          victim = teamSides[1].find(
            (player) => player.participantId === victimId
          ).puuid;
        } else if (inRedTeam) {
          team = "red";
          killer = inRedTeam.puuid;
          victim = teamSides[0].find(
            (player) => player.participantId === victimId
          ).puuid;
        }
        return {
          x: position.x,
          y: position.y,
          z: 50,
          team: team,
          killer: killer,
          victim: victim,
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
    <div className="kill-map-container">
      <div className="kill-map" style={backgroundMap} />
      <KillMapScatterChart killData={killMap} mapId={map} />
    </div>
  );
}
