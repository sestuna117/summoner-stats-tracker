import React from "react";
import ProgressBar from "../../ProgressBar";
import "./DamageDetail.css";

export default function DamageDetail(props) {
  const { damage, maxDamage } = props;

  return (
    <div className="table-detail table-detail-dmg">
      <div className="damage-text">{damage}</div>
      <ProgressBar progress={damage} maxValue={maxDamage} />
    </div>
  );
}
