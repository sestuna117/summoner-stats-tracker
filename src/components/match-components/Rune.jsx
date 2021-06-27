import React from "react";
import getRuneIcon from "../../util/getRuneIcon";
import "./Rune.css";

export default function Rune(props) {
  const { rune } = props;

  return (
    <img
      className="rune-page-rune"
      src={getRuneIcon(rune?.icon)}
      alt={rune.key}
    />
  );
}
