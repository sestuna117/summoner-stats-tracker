import React from "react";
import "./RuneRow.css";
import Rune from "./Rune";

export default function RuneRow(props) {
  const { activeRunes, slot } = props;

  return (
    <div className="runes-page-row">
      {slot?.runes.map((rune) => (
        <Rune
          key={rune.id}
          isActive={activeRunes.includes(rune.id)}
          rune={rune}
        />
      ))}
    </div>
  );
}
