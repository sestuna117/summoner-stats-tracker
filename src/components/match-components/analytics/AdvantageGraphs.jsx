import React from "react";
import GoldGraph from "./GoldGraph";
import KillGraph from "./KillGraph";
import "./AdvantageGraphs.css";

export default function AdvantageGraphs(props) {
  const { timeline, teamSides, killData } = props;

  return (
    <div className="advantage-graphs">
      <GoldGraph timeline={timeline} teamSides={teamSides} />
      <KillGraph killData={killData} teamSides={teamSides} />
    </div>
  );
}
