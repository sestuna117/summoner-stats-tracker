import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Label } from "recharts";
import "./TeamAnalytics.css";

export default function TeamAnalytics(props) {
  const { participants, TEAM } = props;
  const [rolePairs, setRolePairs] = useState(new Map());
  console.log(participants);

  const data = [
    { name: "Red", value: 30 },
    { name: "Blue", value: 20 },
  ];

  useEffect(() => {
    const allParticpants = Array.from(participants.values()).flat();
    console.log(allParticpants);
    const pairs = new Map();
    allParticpants.forEach((participant) => {
      if (!pairs.get(participant.individualPosition)) {
        pairs.set(participant.individualPosition, []);
      }
      let group = pairs.get(participant.individualPosition);
      group.push(participant);
      pairs.set(participant.individualPosition, group);
    });
    console.log(pairs);
    setRolePairs(pairs);
  }, []);

  return (
    <div className="chart-container">
      <PieChart width={400} height={400}>
        <Pie dataKey="value" data={data} innerRadius={60} outerRadius={80}>
          <Label value="Sum" position="center" />
        </Pie>
      </PieChart>
    </div>
  );
}
