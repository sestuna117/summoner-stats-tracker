import React, { useEffect, useState } from "react";
import ChampAbility from "./ChampAbility";
import "./AbilityRow.css";
import AbilityRowSlot from "./AbilityRowSlot";

export default function AbilityRow(props) {
  const { spell, skillOrder, maxLevel } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [levelOrder, setLevelOrder] = useState([]);

  function displayRow() {
    setIsLoaded(false);
    if (skillOrder == null || maxLevel === 0) {
      return;
    }
    const result = Array.from(Array(maxLevel).keys()).map((level, index) =>
      skillOrder.includes(index) ? index + 1 : ""
    );

    setLevelOrder(result);
    setIsLoaded(true);
  }

  useEffect(() => {
    displayRow();
  }, [skillOrder, maxLevel]);

  return isLoaded ? (
    <div className="ability-row">
      <ChampAbility key={spell.name} ability={spell} />
      {levelOrder.map((level, index) => (
        <AbilityRowSlot value={level} key={index} />
      ))}
    </div>
  ) : null;
}
