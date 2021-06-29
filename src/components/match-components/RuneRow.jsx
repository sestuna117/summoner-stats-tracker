import React from "react";
import "./RuneRow.css";
import Rune from "./Rune";

export default function RuneRow(props) {
  const { playerRunes, slot } = props;

  return (
    <div className="runes-page-row">
      {slot?.runes.map((rune) => (
        <Rune key={rune.key} playerRunes={playerRunes} rune={rune} />
      ))}
    </div>
  );
}
