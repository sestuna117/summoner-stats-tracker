import React from "react";
import "./TableDetailSection.css";

export default function KdaDetail(props) {
  const { kills, deaths, assists } = props;
  return (
    <div className="table-detail table-detail-kda">
      <span>{`${kills} / ${deaths} / ${assists}`}</span>
      <span>
        {kills + assists === 0
          ? "0.00:1"
          : isFinite((kills + assists) / deaths)
          ? ((kills + assists) / deaths).toFixed(2) + ":1"
          : "Perfect"}{" "}
        KDA
      </span>
    </div>
  );
}
