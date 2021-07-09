import React, { useEffect, useState } from "react";
import ChampAbility from "./ChampAbility";
import "./AbilityRow.css";

export default function AbilityRow(props) {
  const { spell, slot, skillOrder, maxLevel } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(skillOrder);
  console.log(maxLevel);
  console.log(Array.from(Array(maxLevel).keys()));

  function displayRow() {
    if (skillOrder == null || maxLevel === 0) {
      setIsLoaded(false);
      return;
    }
    Array.from(Array(maxLevel).keys()).map((level, index) => (
      <div className="ability-cell">
        {skillOrder.includes(index) ? index + 1 : ""}
      </div>
    ));
    setIsLoaded(true);
  }

  useEffect(() => {
    displayRow();
  }, []);

  return (
    <div className="ability-row">
      <ChampAbility key={spell.name} ability={spell} />
      {isLoaded ? displayRow() : null}
    </div>
  );
}
