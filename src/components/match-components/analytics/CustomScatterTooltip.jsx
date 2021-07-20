import React from "react";
import "./CustomScatterTooltip.css";

export default function CustomScatterTooltip({ active, payload }) {
  console.log(payload);
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{payload[0].payload.fullName}</p>
        <p className="desc">size: {payload[0].payload.sizeMB}</p>
      </div>
    );
  }

  return null;
}
