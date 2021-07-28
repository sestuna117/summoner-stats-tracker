import React from "react";
import "./CsDetail.css";

export default function CsDetail(props) {
  const { duration, cs } = props;
  const durationInMin = duration / (1000 * 60);
  console.log(durationInMin);

  return (
    <div className="cs-detail">
      <span>{cs}</span>
      <span>{(cs / durationInMin).toFixed(1) + "/m"}</span>
    </div>
  );
}
