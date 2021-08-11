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
import SummonerRune from "./SummonerRune";
import SummonerSpell from "./SummonerSpell";

export default function PerksSpells(props) {
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
        <SummonerSpell spellInfo={sum1} isTeamDetail={isTeamDetail} />
        <SummonerSpell spellInfo={sum2} isTeamDetail={isTeamDetail} />
      </div>
      <div className="runes-column">
        <SummonerRune runeInfo={rune1} isTeamDetail={isTeamDetail} />
        <SummonerRune runeInfo={rune2} isTeamDetail={isTeamDetail} />
      </div>
    </div>
  );
}
