import React, { useEffect, useState } from "react";
import "./ItemTimeline.css";
import ItemTimelineGroup from "./ItemTimelineGroup";

export default function ItemTimeline(props) {
  const { participantId, timeline } = props;
  const [playerEvent, setPlayerEvent] = useState([]);
  const [itemGroups, setItemGroups] = useState(new Map());

  function loadItemOrder() {
    if (timeline === undefined || participantId === undefined) {
      return;
    }

    const MINUTE = 60 * 1000;
    const playerEvents = timeline.info.frames
      .flatMap((frame) =>
        frame.events.filter(
          (event) =>
            event.type === "ITEM_PURCHASED" &&
            event.participantId === participantId
        )
      )
      .map((event) => ({
        id: event.itemId,
        timestamp: Math.round(event.timestamp / MINUTE),
      }));
    setPlayerEvent(playerEvents);
    console.log(playerEvents);
  }

  useEffect(() => {
    loadItemOrder();
  }, [timeline, participantId]);

  useEffect(() => {
    const groups = new Map();
    playerEvent.forEach((event) => {
      if (!groups.get(event.timestamp)) {
        groups.set(event.timestamp, []);
      }
      let group = groups.get(event.timestamp);
      group.push(event.id);
      groups.set(event.timestamp, group);
    });
    setItemGroups(groups);
  }, [playerEvent]);

  return (
    <div className="item-timeline-container">
      <p className="data-header">Item Build</p>
      <div className="item-timeline">
        {Array.from(itemGroups.entries()).map(([time, items], index) => (
          <ItemTimelineGroup
            time={time}
            items={items}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
