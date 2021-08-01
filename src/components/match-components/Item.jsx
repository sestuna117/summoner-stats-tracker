import React, { useContext } from "react";
import { DDragonVersionContext, ItemDataContext } from "../../hook";
import getItemIcon from "../../util/getItemIcon";
import "./Item.css";
import noItem from "../../icons/emptyslot.png";

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
      <img className="item-sprite" src={noItem} alt={"No Item"} />
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
