import React from "react";
import "./TableDetailSection.css";

export default function WardDetails(props) {
  const { wardsPlaced, wardsKilled, redsPlaced, visionScore } = props;

  return (
    <div className="table-detail">
      <span>{visionScore}</span>
      <span>{`${wardsPlaced} (${redsPlaced}) / ${wardsKilled}`}</span>
    </div>
  );
}
