import React, { useContext, useState } from "react";
import cx from "classnames";
import noSpell from "../../icons/emptyslot.png";
import getSummonerSpellUrl from "../../util/getSummonerSpellUrl";
import { DDragonVersionContext } from "../../hook";
import { usePopper } from "react-popper";
import SummonerSpellTooltip from "./SummonerSpellTooltip";
import "./SummonerSpell.css";
import "../PopperTooltip.css";

export default function SummonerSpell(props) {
  const { spellInfo, isTeamDetail } = props;
  const dDragon = useContext(DDragonVersionContext);

  const [isVisible, setIsVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top", "bottom"] } },
    ],
  });

  return !spellInfo ? (
    <img
      className={cx("no-spell", {
        "team-spell": isTeamDetail,
        "sum-spell": !isTeamDetail,
      })}
      src={noSpell}
      alt={"No Spell"}
    />
  ) : (
    <div className="summoner-spell">
      <img
        className={isTeamDetail ? "team-spell" : "sum-spell"}
        src={getSummonerSpellUrl(spellInfo?.id, dDragon)}
        alt={spellInfo}
        ref={setReferenceElement}
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
      />
      {isVisible ? (
        <div
          className="popper-tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <SummonerSpellTooltip spellInfo={spellInfo} />
          <div
            className="popper-arrow"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      ) : null}
    </div>
  );
}
