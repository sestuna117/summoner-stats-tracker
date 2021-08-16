import React, { useEffect, useState } from "react";
import ChampSprite from "../ChampSprite";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import "./DuoVerticalBarCharts.css";
import CustomBarTooltip from "./CustomBarTooltip";

export default function DuoVerticalBarCharts(props) {
  const { participants, rolePairs } = props;
  const [data, setData] = useState([]);
  const theme = document.getElementById("page-theme").className;
  const isDark = theme === "page dark-mode";

  function createData() {
    if (!rolePairs) {
      return;
    }
    const dataMap = [];
    rolePairs.forEach((pair) => {
      const data = {
        Blue: pair[0],
        Red: pair[1],
      };
      dataMap.push(data);
    });
    setData(dataMap);
  }

  useEffect(() => {
    createData();
  }, [rolePairs]);

  const renderCustomizedLabel = (props) => {
    const { content, ...rest } = props;

    return <Label {...rest} fontSize="10" fill="#FFFFFF" fontWeight="Bold" />;
  };

  return (
    <div className="chart-container">
      <div className="icon-column">
        {participants.get(100).map((participant, index) => (
          <ChampSprite key={index} participant={participant} />
        ))}
      </div>
      <ResponsiveContainer height={110} width={"100%"}>
        <BarChart
          layout="vertical"
          data={data}
          stackOffset="expand"
          margin={{ top: 5, left: 2, right: 2, bottom: 5 }}
        >
          <XAxis hide type="number" />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#FFFFFF"
            fontSize="12"
            width={0}
          />
          <Tooltip content={<CustomBarTooltip />} />
          <Bar
            dataKey="Blue"
            fill={isDark ? "#336d9e" : "#7db2ff"}
            stackId="a"
            isAnimationActive={false}
          >
            <LabelList
              dataKey="Blue"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
          <Bar
            dataKey="Red"
            fill={isDark ? "#9e4155" : "#ff938b"}
            stackId="a"
            isAnimationActive={false}
          >
            <LabelList
              dataKey="Red"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="icon-column">
        {participants.get(200).map((participant, index) => (
          <ChampSprite key={index} participant={participant} />
        ))}
      </div>
    </div>
  );
}
