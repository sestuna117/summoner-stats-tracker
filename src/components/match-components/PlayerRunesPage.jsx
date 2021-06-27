import React, { useContext } from "react";
import { RuneDataContext, RuneShardsDataContext } from "../../hook";
import getRuneIcon from "../../util/getRuneIcon";
import "./PlayerRunesPage.css";

export default function PlayerRunesPage(props) {
  const { player } = props;
  const runeData = useContext(RuneDataContext);
  const shardData = useContext(RuneShardsDataContext);

  const primaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[0].style
  );
  const secondaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[1].style
  );

  function displayRuneRow(slot, isSecondary) {
    return (
      <div className="runes-page-row">
        {slot?.runes.map((rune) => (
          <img
            className="rune-page-rune"
            src={getRuneIcon(rune?.icon)}
            alt={rune.key}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="player-runes">
      <div className="primary-runes">
        <img
          className="rune-page-rune"
          src={getRuneIcon(primaryRunes?.icon)}
          alt={primaryRunes?.key}
        />
        {primaryRunes?.slots.map((slot) => displayRuneRow(slot, false))}
      </div>
      <div className="secondary-runes">
        <img
          className="rune-page-rune"
          src={getRuneIcon(secondaryRunes?.icon)}
          alt={secondaryRunes?.key}
        />
        {secondaryRunes?.slots
          .slice(1)
          .map((slot) => displayRuneRow(slot, true))}
      </div>
      <div className="rune-shards"></div>
    </div>
  );
}
