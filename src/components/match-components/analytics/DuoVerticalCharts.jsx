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
import "./DuoVerticalCharts.css";

export default function DuoVerticalCharts(props) {
  const { participants, rolePairs } = props;
  const [data, setData] = useState([]);

  function createData() {
    if (!rolePairs) {
      return;
    }
    const dataMap = [];
    rolePairs.forEach((pair) => {
      const data = {
        blue: pair[0],
        red: pair[1],
      };
      dataMap.push(data);
    });
    console.log(dataMap);
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
          <Tooltip />
          <Bar dataKey="blue" fill="#7db2ff" stackId="a">
            <LabelList
              dataKey="blue"
              position="center"
              content={renderCustomizedLabel}
            />
          </Bar>
          <Bar dataKey="red" fill="#ff938b" stackId="a">
            <LabelList
              dataKey="red"
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
