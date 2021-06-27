import React, { useContext } from "react";
import { RuneDataContext } from "../../hook";

export default function PlayerRunesPage(props) {
  const { player } = props;
  const runeData = useContext(RuneDataContext);
  const allRunePage = runeData.flatMap((page) =>
    page.slots.flatMap((slot) => slot.runes)
  );

  return (
    <div className="player-runes">
      <div className="primary-runes"></div>
      <div className="secondary-runes"></div>
      <div className="rune-shards"></div>
    </div>
  );
}
