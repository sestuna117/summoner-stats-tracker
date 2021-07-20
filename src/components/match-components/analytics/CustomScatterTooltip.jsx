import React from "react";
import "./CustomScatterTooltip.css";
import ChampSprite from "../ChampSprite";

export default function CustomScatterTooltip({ active, payload }) {
  if (active) {
    return (
      <div className="custom-scatter-tooltip">
        <p className="time">{payload[0].payload.timestamp} min</p>
        <div className="desc">
          <div className="inline-section">
            <ChampSprite participant={payload[0].payload.killer} />
            <span>{`${payload[0].payload.killer.sumName}`}</span>
          </div>
          <span className="kill-text"> killed </span>
          <div className="inline-section">
            <ChampSprite participant={payload[0].payload.victim} />
            <span>{`${payload[0].payload.victim.sumName}`}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
