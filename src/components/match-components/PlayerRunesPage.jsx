import React, { useContext } from "react";
import { RuneDataContext } from "../../hook";
import getRuneIcon from "../../util/getRuneIcon";
import "./PlayerRunesPage.css";
import RuneRow from "./RuneRow";
import RuneShards from "./RuneShards";

export default function PlayerRunesPage(props) {
  const { player } = props;
  const runeData = useContext(RuneDataContext);

  const primaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[0].style
  );
  const secondaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[1].style
  );

  const activeRunes =
    player.perks.styles.flatMap((obj) =>
      obj.selections.map((rune) => rune.perk)
    ) ?? [];

  return (
    <div className="player-runes">
      <p className="data-header">Runes</p>
      <div className="runes-body">
        <div className="primary-runes">
          <img
            className="rune rune-active"
            src={getRuneIcon(primaryRunes?.icon)}
            alt={primaryRunes?.key}
          />
          {primaryRunes?.slots.map((slot) => (
            <RuneRow
              key={slot.runes[0].id}
              activeRunes={activeRunes}
              slot={slot}
            />
          ))}
          <p className="perk-type-name">{primaryRunes.name}</p>
        </div>
        <div className="secondary-runes">
          <img
            className="rune rune-active"
            src={getRuneIcon(secondaryRunes?.icon)}
            alt={secondaryRunes?.key}
          />
          {secondaryRunes?.slots.slice(1).map((slot) => (
            <RuneRow
              key={slot.runes[0].id}
              activeRunes={activeRunes}
              slot={slot}
            />
          ))}
          <p className="perk-type-name">{secondaryRunes.name}</p>
        </div>
        <div className="rune-shards-container">
          <RuneShards playerShards={player.perks.statPerks} />
          <p className="perk-type-name">Shards</p>
        </div>
      </div>
    </div>
  );
}
