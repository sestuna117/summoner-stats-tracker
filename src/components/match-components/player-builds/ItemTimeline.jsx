import React, { useContext, useEffect, useState } from "react";
import "./ItemTimeline.css";
import { ItemDataContext } from "../../../hook";
import Item from "../Item";

export default function ItemTimeline(props) {
  const { participantId, timeline } = props;
  const itemContext = useContext(ItemDataContext);
  const [playerEvent, setPlayerEvent] = useState([]);

  function loadItemOrder() {
    if (timeline === undefined || participantId === undefined) {
      return;
    }

    const playerEvents = timeline.info.frames.flatMap((frame) =>
      frame.events.filter(
        (event) =>
          event.type === "ITEM_PURCHASED" &&
          event.participantId === participantId
      )
    );
    setPlayerEvent(playerEvents);
    console.log(playerEvents);
  }

  useEffect(() => {
    loadItemOrder();
  }, [timeline, participantId]);

  return (
    <div className="item-timeline-container">
      <p className="data-header">Item Build</p>
      <div className="item-timeline">
        {playerEvent.map((event) => (
          <Item itemId={event.itemId} />
        ))}
      </div>
    </div>
  );
}
