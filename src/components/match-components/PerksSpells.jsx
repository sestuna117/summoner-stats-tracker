import React, { useContext } from "react";
import {
  DDragonVersionContext,
  RuneDataContext,
  SumsDataContext,
} from "../../hook";
import getSummonerSpellUrl from "../../util/getSummonerSpellUrl";
import getRuneIcon from "../../util/getRuneIcon";
import "./PerksSpells.css";
import noSpell from "../../icons/emptyslot.png";
import cx from "classnames";

export default function PerksSpells(props) {
  const dDragon = useContext(DDragonVersionContext);
  const sumsData = useContext(SumsDataContext);
  const runeData = useContext(RuneDataContext);
  const { participant, isTeamDetail } = props;
  const allRunePage = runeData.flatMap((page) =>
    page.slots.flatMap((slot) => slot.runes)
  );

  let sum1 = Object.values(sumsData.data).find(
    (sums) => parseInt(sums.key) === participant?.summoner1Id
  );
  let sum2 = Object.values(sumsData.data).find(
    (sums) => parseInt(sums.key) === participant?.summoner2Id
  );
  let rune1 = allRunePage.find(
    (runes) => runes.id === participant?.perks?.styles[0].selections[0]?.perk
  );
  let rune2 = runeData.find(
    (runes) => runes.id === participant?.perks?.styles[1].style
  );

  return (
    <div className="perks-spells">
      <div className="spells-column">
        {!sum1 ? (
          <img
            className={cx("no-spell", {
              "team-spell": isTeamDetail,
              "sum-spell": !isTeamDetail,
            })}
            src={noSpell}
            alt={"No Spell"}
          />
        ) : (
          <img
            className={isTeamDetail ? "team-spell" : "sum-spell"}
            src={getSummonerSpellUrl(sum1?.id, dDragon)}
            alt={sum1}
          />
        )}
        {!sum2 ? (
          <img
            className={cx("no-spell", {
              "team-spell": isTeamDetail,
              "sum-spell": !isTeamDetail,
            })}
            src={noSpell}
            alt={"No Spell"}
          />
        ) : (
          <img
            className={isTeamDetail ? "team-spell" : "sum-spell"}
            src={getSummonerSpellUrl(sum2?.id, dDragon)}
            alt={sum2}
          />
        )}
      </div>
      <div className="runes-column">
        <img
          className={isTeamDetail ? "team-rune" : "sum-spell"}
          src={getRuneIcon(rune1?.icon)}
          alt={rune1?.key}
        />
        <img
          className={isTeamDetail ? "team-rune" : "sum-spell"}
          src={getRuneIcon(rune2?.icon)}
          alt={rune2?.key}
        />
      </div>
    </div>
  );
}
