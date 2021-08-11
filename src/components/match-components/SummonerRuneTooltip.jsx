import React from "react";
import "./SummonerRuneTooltip.css";

const KEYSTONES = [
  { key: 8000, tooltip: "Improved attacks and sustained damage" },
  { key: 8100, tooltip: "Burst damage and target access" },
  { key: 8200, tooltip: "Empowered abilities and resource manipulation" },
  { key: 8300, tooltip: "Creative tools and rule bending" },
  { key: 8400, tooltip: "Durability and crowd control" },
];

const BRACKETS = /<.*?>/g;

export default function SummonerRuneTooltip(props) {
  const { runeInfo, isKeystone } = props;
  const { key, longDesc, id } = runeInfo;

  return (
    <div className="rune-tooltip">
      <p className="rune-tooltip-name">
        {key.replace(/([A-Z])/g, " $1").trim()}
      </p>
      {isKeystone ? (
        <p>{KEYSTONES.find(({ key }) => key === id).tooltip}</p>
      ) : (
        <div className="rune-tooltip-desc">
          {longDesc.split("<br>").map((desc, index) => (
            <p key={"line" + index}>
              {desc.replace(BRACKETS, "")}
              <br />
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
