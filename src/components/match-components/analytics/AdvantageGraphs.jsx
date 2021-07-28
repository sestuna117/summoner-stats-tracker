import React from "react";
import "./AdvantageGraphs.css";
import GoldGraph from "./GoldGraph";
import KillGraph from "./KillGraph";

export default function AdvantageGraphs(props) {
  const { timeline, teamSides, killData } = props;

  return (
    <div className="advantage-graphs">
      <GoldGraph timeline={timeline} teamSides={teamSides} />
      <KillGraph killData={killData} teamSides={teamSides} />
    </div>
  );
}
