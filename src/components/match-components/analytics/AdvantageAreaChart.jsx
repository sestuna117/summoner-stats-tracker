import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function AdvantageAreaChart(props) {
  const { timelineData } = props;
  const [off, setOff] = useState();

  function setGradientOff() {
    if (!timelineData) {
      return;
    }
    const gradientOffset = () => {
      const dataMax = Math.max(...timelineData.map((i) => i.data));
      const dataMin = Math.min(...timelineData.map((i) => i.data));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };

    setOff(gradientOffset());
  }

  useEffect(() => {
    setGradientOff();
  }, [timelineData]);

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <AreaChart
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
          interval={0}
          dataKey="timestamp"
          unit=" m"
          tick={{ fontSize: 10 }}
          axisLine={false}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#7db2ff" stopOpacity={1} />
            <stop offset={off} stopColor="#ff938b" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="data"
          stroke="#5c5c5c"
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
