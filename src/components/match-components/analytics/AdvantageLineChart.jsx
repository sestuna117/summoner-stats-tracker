import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function AdvantageLineChart(props) {
  const { timelineData } = props;
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        width={500}
        height={400}
        data={timelineData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          interval={1}
          dataKey="timestamp"
          unit=" m"
          tick={{ fontSize: 10 }}
          axisLine={false}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="blue"
          stroke="#7db2ff"
          strokeWidth={2}
          fill="url(#splitColor)"
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="red"
          stroke="#ff938b"
          strokeWidth={2}
          fill="url(#splitColor)"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
