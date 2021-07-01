import React from "react";
import ChampAbility from "./ChampAbility";
import "./AbilityRow.css";

export default function AbilityRow(props) {
  const { spell, slot, skillOrder, maxLevel } = props;
  console.log(skillOrder);
  console.log(maxLevel);
  console.log(Array.from(maxLevel));
  return (
    <div className="ability-row">
      <ChampAbility key={spell.name} ability={spell} />
      {Array.from(maxLevel).map((level, index) => (
        <div className="ability-cell">
          {skillOrder.contains(index) ? index : ""}
        </div>
      ))}
    </div>
  );
}
