import React, { useEffect, useState } from "react";
import AdvantageAreaChart from "./AdvantageAreaChart";

export default function GoldGraph(props) {
  const { timeline, teamSides } = props;
  const [goldData, setGoldData] = useState();

  function loadEventTimeline() {
    if (!timeline || !teamSides) {
      return;
    }

    const MINUTE = 60 * 1000;
    const checkedTimes = new Set();
    const playerEvents = timeline.info.frames.flatMap((frame) => {
      let time = Math.round(frame.timestamp / MINUTE);
      if (checkedTimes.has(time)) {
        time++;
      }
      checkedTimes.add(time);
      return {
        participants: frame.participantFrames,
        timestamp: time,
      };
    });

    const goldTimeline = playerEvents.map((event) => {
      let dataSum = 0;
      Object.entries(event.participants).forEach(([index, participant]) => {
        if (teamSides[0].includes(parseInt(index))) {
          dataSum += participant.totalGold;
        } else {
          dataSum -= participant.totalGold;
        }
      });
      return { data: dataSum, timestamp: event.timestamp };
    });

    setGoldData(goldTimeline);
  }

  useEffect(() => {
    loadEventTimeline();
  }, [timeline, teamSides]);

  return (
    <div>
      <p className="data-header">Gold Advantage</p>
      <AdvantageAreaChart timelineData={goldData} />
    </div>
  );
}
