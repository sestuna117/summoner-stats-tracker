import React from "react";
import "./RuneRow.css";
import SummonerRune from "../SummonerRune";

export default function RuneRow(props) {
  const { activeRunes, slot } = props;

  return (
    <div className="runes-page-row">
      {slot?.runes.map((rune) => (
        <SummonerRune
          key={rune.id}
          runeInfo={rune}
          isActive={activeRunes.includes(rune.id)}
          isRunePage={true}
        />
      ))}
    </div>
  );
}
