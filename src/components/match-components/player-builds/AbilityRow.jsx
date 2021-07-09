import React, { useEffect, useState } from "react";
import ChampAbility from "./ChampAbility";
import "./AbilityRow.css";
import AbilityRowSlot from "./AbilityRowSlot";

export default function AbilityRow(props) {
  const { spell, slot, skillOrder, maxLevel } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [levelOrder, setLevelOrder] = useState([]);
  console.group("Skill Level Up Order params");
  console.log("Level skilled was increased at: " + skillOrder);
  console.log("Max level reached: " + maxLevel);
  console.log(Array.from(Array(maxLevel).keys()));
  console.log(levelOrder);
  console.groupEnd();

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
