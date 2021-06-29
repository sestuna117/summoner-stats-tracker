import React from "react";
import getRuneIcon from "../../util/getRuneIcon";
import "./Rune.css";
import cx from "classnames";

export default function Rune(props) {
  const { rune, isActive } = props;

  return (
    <img
      className={cx("rune", {
        "rune-active": isActive,
      })}
      src={getRuneIcon(rune?.icon)}
      alt={rune.key}
    />
  );
}
