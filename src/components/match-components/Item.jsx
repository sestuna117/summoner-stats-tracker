import React, { useContext, useEffect, useState } from "react";
import { DDragonVersionContext, ItemDataContext } from "../../hook";
import getItemIcon from "../../util/getItemIcon";
import "./Item.css";
import noItem from "../../icons/emptyslot.png";
import { usePopper } from "react-popper";
import "../PopperTooltip.css";
import ItemTooltip from "./ItemTooltip";

export default function Item(props) {
  const { itemId } = props;
  const isNoItem = itemId === 0;
  const dDragon = useContext(DDragonVersionContext);
  const itemData = useContext(ItemDataContext);

  let itemInfo = Object.entries(itemData.data).find(
    (item) => parseInt(item[0]) === itemId
  );

  useEffect(() => {
    if (itemId) {
      return;
    }
    itemInfo = Object.entries(itemData.data).find(
      (item) => parseInt(item[0]) === itemId
    );
  }, [itemId]);

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

  return isNoItem ? (
    <div className="item">
      <img className="item-sprite" src={noItem} alt={"No Item"} />
    </div>
  ) : (
    <div className="item">
      <img
        className="item-sprite"
        src={getItemIcon(itemId, dDragon)}
        alt={`${itemInfo[1].name}`}
        ref={setReferenceElement}
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(true);
        }}
      />

      {isVisible ? (
        <div
          className="popper-tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <ItemTooltip itemInfo={itemInfo[1]} />
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
