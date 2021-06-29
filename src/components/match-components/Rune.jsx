import React from "react";
import getRuneIcon from "../../util/getRuneIcon";
import "./Rune.css";
import cx from "classnames";

export default function Rune(props) {
  const { rune, playerRunes } = props;

  return (
    <img
      className={cx("rune", {
        "rune-inactive": !playerRunes.some(
          (activeRunes) => activeRunes.perk === rune.id
        ),
      })}
      src={getRuneIcon(rune?.icon)}
      alt={rune.key}
    />
  );
}
