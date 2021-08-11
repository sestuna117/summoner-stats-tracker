import React from "react";
import getRuneIcon from "../../util/getRuneIcon";

export default function SummonerRune(props) {
  const { runeInfo, isTeamDetail } = props;

  return (
    <img
      className={isTeamDetail ? "team-rune" : "sum-spell"}
      src={getRuneIcon(runeInfo?.icon)}
      alt={runeInfo?.key}
    />
  );
}
