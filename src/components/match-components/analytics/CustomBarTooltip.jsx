import React from "react";
import "./CustomBarTooltip.css";

export default function CustomBarTooltip({ active, payload }) {
  if (active && payload) {
    const data = payload[0].payload;
    return (
      <div className="custom-bar-tooltip">
        <p className="desc">
          {data.Blue > data.Red
            ? "Blue"
            : data.Blue === data.Red
            ? "No"
            : "Red"}{" "}
          Team Advantage
        </p>
        <div>
          <span className="label label-blue">{"Blue: "}</span>
          <span className="label">{`${data.Blue}`}</span>
        </div>
        <div>
          <span className="label label-red">{"Red: "}</span>
          <span className="label">{`${data.Red}`}</span>
        </div>
      </div>
    );
  }

  return null;
}
