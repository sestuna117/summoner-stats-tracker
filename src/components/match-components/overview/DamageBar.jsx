import React from "react";
import "./DamageBar.css";

export default function DamageBar(props) {
  const { damage, maxDamage } = props;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${(damage / maxDamage) * 100}%` }}
      />
    </div>
  );
}
