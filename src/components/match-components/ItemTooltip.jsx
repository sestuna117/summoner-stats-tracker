import React from "react";
import "./ItemTooltip.css";

// const BREAK = /(<br>)/;
const BRACKETS = /<.*?>/g;

export default function ItemTooltip(props) {
  const { itemInfo } = props;
  const { name, plaintext, description, gold } = itemInfo;

  let itemDesc = description.split("<br>");

  return (
    <div className="item-tooltip">
      <p className="item-tooltip-name">{name}</p>
      <p className="item-tooltip-text">{plaintext}</p>
      <div className="item-tooltip-desc">
        {itemDesc.map((desc, index) => (
          <p key={"line" + index}>
            {desc.replace(BRACKETS, "")}
            <br />
          </p>
        ))}
      </div>
      {gold.total !== 0 && gold.sell !== 0 ? (
        <div>
          <span>Gold: </span>
          <span className="item-tooltip-gold">{`${gold.total} (${gold.sell})`}</span>
        </div>
      ) : null}
    </div>
  );
}
