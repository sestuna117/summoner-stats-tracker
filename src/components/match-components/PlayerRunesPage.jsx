import React, { useContext } from "react";
import { RuneDataContext, RuneShardsDataContext } from "../../hook";
import getRuneIcon from "../../util/getRuneIcon";
import "./PlayerRunesPage.css";
import RuneRow from "./RuneRow";

const SHARD_ID_REGEX = /^500[0-9]$/;

export default function PlayerRunesPage(props) {
  const { player } = props;
  const runeData = useContext(RuneDataContext);
  const shardData = useContext(RuneShardsDataContext);

  let shardsType = shardData.filter((rune) =>
    rune?.id.toString().match(SHARD_ID_REGEX)
  );
  console.log(shardsType);

  const primaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[0].style
  );
  const secondaryRunes = runeData.find(
    (page) => page.id === player?.perks?.styles[1].style
  );

  return (
    <div className="player-runes">
      <div className="primary-runes">
        <img
          className="rune-page-rune"
          src={getRuneIcon(primaryRunes?.icon)}
          alt={primaryRunes?.key}
        />
        {primaryRunes?.slots.map((slot) => (
          <RuneRow key={slot.runes[0].id} slot={slot} />
        ))}
      </div>
      <div className="secondary-runes">
        <img
          className="rune-page-rune"
          src={getRuneIcon(secondaryRunes?.icon)}
          alt={secondaryRunes?.key}
        />
        {secondaryRunes?.slots.slice(1).map((slot) => (
          <RuneRow key={slot.runes[0].id} slot={slot} />
        ))}
      </div>
      <div className="rune-shards"></div>
    </div>
  );
}
