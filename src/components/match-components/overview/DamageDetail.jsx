import React from "react";
import DamageBar from "./DamageBar";
import "./DamageDetail.css";

export default function DamageDetail(props) {
  const { damage, maxDamage } = props;

  return (
    <div className="table-detail">
      <div className="damage-text">{damage}</div>
      <DamageBar damage={damage} maxDamage={maxDamage} />
    </div>
  );
}
