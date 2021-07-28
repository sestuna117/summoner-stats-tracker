import React from "react";
import "./TableDetailSection.css";

export default function KdaDetail(props) {
  const { kills, deaths, assists } = props;
  return (
    <div className="table-detail">
      <span>{`${kills} / ${deaths} / ${assists}`}</span>
      <span>
        {isFinite((kills + assists) / deaths)
          ? ((kills + assists) / deaths).toFixed(2) + ":1"
          : "Perfect"}{" "}
        KDA
      </span>
    </div>
  );
}
