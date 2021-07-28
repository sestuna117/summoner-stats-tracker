import React from "react";
import "./TableDetailSection.css";

export default function CsDetail(props) {
  const { duration, cs } = props;
  const durationInMin = duration / (1000 * 60);

  return (
    <div className="table-detail">
      <span>{cs}</span>
      <span>{(cs / durationInMin).toFixed(1) + "/m"}</span>
    </div>
  );
}
