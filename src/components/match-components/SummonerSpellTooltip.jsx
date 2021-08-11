import React from "react";
import "./SummonerSpellTooltip.css";

export default function SummonerSpellTooltip(props) {
  const { spellInfo } = props;

  return (
    <div className="spell-tooltip">
      <p className="spell-tooltip-name">{spellInfo.name}</p>
      <p className="spell-tooltip-desc">{spellInfo.description}</p>
    </div>
  );
}
