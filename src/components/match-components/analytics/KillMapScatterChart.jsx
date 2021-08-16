import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import CustomScatterTooltip from "./CustomScatterTooltip";

function xDomain(mapId) {
  switch (mapId) {
    case 11:
      return [-120, 14780];
    case 10:
      return [0, 15398];
    default:
      return [-28, 12849];
  }
}

function yDomain(mapId) {
  switch (mapId) {
    case 11:
      return [-120, 14980];
    case 10:
      return [0, 15398];
    default:
      return [-19, 12858];
  }
}

export default function KillMapScatterChart(props) {
  const { killData, mapId } = props;
  const [chartData, setChartData] = useState();

  function loadChartData() {
    if (!killData || !mapId) {
      return;
    }
    setChartData(killData);
  }

  useEffect(() => {
    loadChartData();
  }, [killData, mapId]);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <ScatterChart>
        <XAxis type="number" dataKey="x" hide={true} domain={xDomain(mapId)} />
        <YAxis type="number" dataKey="y" hide={true} domain={yDomain(mapId)} />
        <Tooltip content={<CustomScatterTooltip />} />
        <Scatter
          data={chartData}
          fill="#7db2ff"
          stroke="#adadad"
          strokeWidth={2}
          isAnimationActive={false}
        >
          {chartData?.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry
                    ? entry.team === "blue"
                      ? "#4782b3"
                      : "#b65c6f"
                    : "none"
                }
              />
            );
          })}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
