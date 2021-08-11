import React, { useState } from "react";
import getRuneIcon from "../../util/getRuneIcon";
import "./SummonerRune.css";
import "../PopperTooltip.css";
import cx from "classnames";
import { usePopper } from "react-popper";
import SummonerRuneTooltip from "./SummonerRuneTooltip";

export default function SummonerRune(props) {
  const { runeInfo, isTeamDetail, isActive, isRunePage, isPerk, isKeystone } =
    props;

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

  return (
    <div className="summoner-rune">
      <img
        className={cx({
          rune: isRunePage,
          "rune-active": isActive,
          "team-rune": isTeamDetail,
          "sum-rune": isPerk,
        })}
        src={getRuneIcon(runeInfo?.icon)}
        alt={runeInfo?.key}
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
          <SummonerRuneTooltip runeInfo={runeInfo} isKeystone={isKeystone} />
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
