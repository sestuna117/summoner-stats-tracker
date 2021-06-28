import React from "react";
import "./RuneRow.css";
import Rune from "./Rune";

export default function RuneRow(props) {
  const { slot } = props;

  return (
    <div className="runes-page-row">
      {slot?.runes.map((rune) => (
        <Rune key={rune.key} rune={rune} />
      ))}
    </div>
  );
}
