import React, { useEffect, useState } from "react";
import AdvantageLineChart from "./AdvantageLineChart";

export default function KillGraph(props) {
  const { killData, teamSides } = props;
  const [killTimeline, setKillTimeline] = useState([]);

  function loadKillTimeline() {
    if (!killData || !teamSides) {
      return;
    }
    let blueSum = 0;
    let redSum = 0;
    const teamsEvents = new Map();
    killData.forEach((event) => {
      const killer = parseInt(event.killerId);
      const time = event.timestamp;
      if (teamSides[0].includes(killer)) {
        blueSum++;
      }
      if (teamSides[1].includes(killer)) {
        redSum++;
      }
      teamsEvents.set(time, {
        blue: blueSum,
        red: redSum,
        timestamp: time,
      });
    });
    setKillTimeline(Array.from(teamsEvents.values()));
  }

  useEffect(() => {
    loadKillTimeline();
  }, [killData, teamSides]);

  return (
    <div className="advantage-graph">
      <p className="data-header">Kill Advantage</p>
      <AdvantageLineChart timelineData={killTimeline} />
    </div>
  );
}
