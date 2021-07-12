import React from "react";
import cx from "classnames";
import "./ItemsBlock.css";
import Item from "../Item";

const ITEM_KEY_REGEX = /^item[0-6]$/;

export default function ItemsBlock(props) {
  const { participant, isPlayer } = props;

  let items = Object.fromEntries(
    Object.entries(participant).filter(([key]) => key.match(ITEM_KEY_REGEX))
  );

  return (
    <div
      className={cx({
        "player-item-block": isPlayer,
        "team-item-block": !isPlayer,
      })}
    >
      {Object.entries(items).map((item) => (
        <Item key={item[0]} itemId={item[1]} />
      ))}
    </div>
  );
}
