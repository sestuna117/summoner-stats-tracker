import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import "./TeamAnalytics.css";
import ChampSprite from "../ChampSprite";
import DuoVerticalCharts from "./DuoVerticalCharts";

export default function TeamAnalytics(props) {
  const { participants, match } = props;
  const [rolePairs, setRolePairs] = useState(new Map());
  console.log(participants);
  console.log(rolePairs);
  console.log(
    Array.from(rolePairs.values()).map((pair) => [
      pair[0].totalDamageDealtToChampions,
      pair[1].totalDamageDealtToChampions,
    ])
  );

  function loadPairs() {
    const pairs = new Map();
    const teams = Array.from(participants.values());
    teams[0].forEach((member, index) => {
      pairs.set(index, [member, teams[1][index]]);
    });
    setRolePairs(pairs);
  }

  useEffect(() => {
    loadPairs();
  }, []);

  return (
    <div className="team-analytics">
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].kills,
            pair[1].kills,
          ])}
        />
        <span className="stat-title">Champion Kills</span>
      </div>
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalDamageDealtToChampions,
            pair[1].totalDamageDealtToChampions,
          ])}
        />
        <span className="stat-title">Damage Dealt</span>
      </div>
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalDamageTaken,
            pair[1].totalDamageTaken,
          ])}
        />
        <span className="stat-title">Damage Taken</span>
      </div>
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].goldEarned,
            pair[1].goldEarned,
          ])}
        />
        <span className="stat-title">Gold Income</span>
      </div>
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalMinionsKilled + pair[0].neutralMinionsKilled,
            pair[1].totalMinionsKilled + pair[1].neutralMinionsKilled,
          ])}
        />
        <span className="stat-title">CS Score</span>
      </div>
      <div className="team-stat">
        <DuoVerticalCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].wardsPlaced,
            pair[1].wardsPlaced,
          ])}
        />
        <span className="stat-title">Wards Placed</span>
      </div>
    </div>
  );
}
