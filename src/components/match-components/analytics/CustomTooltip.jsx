import React from "react";
import "./CustomTooltip.css";

export default function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data1 = payload[0].value;

    if (payload.length === 1) {
      return (
        <div className="custom-tooltip">
          <p className="desc">
            {data1 > 0 ? "Blue" : data1 === 0 ? "No" : "Red"} Team Advantage
          </p>
          <p className="label">{`${data1}`}</p>
          <p>{`${payload[0].payload.timestamp} min`}</p>
        </div>
      );
    } else {
      const data2 = payload[1].value;

      return (
        <div className="custom-tooltip">
          <p className="desc">
            {data1 > data2 ? "Blue" : data1 === data2 ? "No" : "Red"} Team
            Advantage
          </p>
          <p className="label blue-label">{`Blue: ${data1}`}</p>
          <p className="label red-label">{`Red: ${data2}`}</p>
          <p>{`${payload[0].payload.timestamp} min`}</p>
        </div>
      );
    }
  }

  return null;
}
