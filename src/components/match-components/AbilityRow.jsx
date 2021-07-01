import React from "react";
import ChampAbility from "./ChampAbility";

export default function AbilityRow(props) {
  const { spell, slot, skillOrder, maxLevel } = props;
  return <ChampAbility key={spell.name} ability={spell} />;
}
