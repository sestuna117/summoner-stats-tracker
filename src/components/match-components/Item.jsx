import React, { useContext } from "react";
import { DDragonVersionContext, ItemDataContext } from "../../hook";
import getItemIcon from "../../util/getItemIcon";
import "./Item.css";

export default function Item(props) {
  const { itemId } = props;
  const isNoItem = itemId === 0;
  const dDragon = useContext(DDragonVersionContext);
  const itemData = useContext(ItemDataContext);

  let itemInfo = Object.values(itemData.data).find(
    (item) => parseInt(item) === itemId
  );

  return isNoItem ? (
    <div className="item">
      <div className="no-item"></div>
    </div>
  ) : (
    <div className="item">
      <img
        className="item-sprite"
        src={getItemIcon(itemId, dDragon)}
        alt={`${itemInfo?.name}`}
      />
    </div>
  );
}
