import React from "react";
import "./ItemTimelineGroup.css";
import Item from "../Item";

export default function ItemTimelineGroup(props) {
  const { time, items, index } = props;

  function insertArrow(index) {
    if (index !== 0) {
      return <div className="item-timeline-arrow">></div>;
    }
  }

  return (
    <div className="item-timeline-group-container">
      {insertArrow(index)}
      <div className="item-timeline-group">
        <div>
          {Array.from(items).map((item, index) => (
            <Item itemId={item} key={index} />
          ))}
        </div>
        <p className="item-timeline-time">{time} min</p>
      </div>
    </div>
  );
}
