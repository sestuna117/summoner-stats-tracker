import React, { useContext, useEffect, useState } from "react";
import { DDragonVersionContext } from "../../../hook";
import getMap from "../../../util/getMap";
import "./KillMap.css";

export default function KillMap(props) {
  const { killData, teamSides, map } = props;
  const dDragon = useContext(DDragonVersionContext);

  const backgroundMap = {
    backgroundImage: `url(${getMap(map, dDragon)})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="kill-map-container">
      <div className="kill-map" style={backgroundMap}></div>
    </div>
  );
}
