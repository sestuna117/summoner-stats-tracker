import React, { useEffect, useState } from "react";
import "./TeamAnalytics.css";
import DuoVerticalBarCharts from "./DuoVerticalBarCharts";

export default function TeamAnalytics(props) {
  const { participants, rolePairs } = props;

  return (
    <div className="team-analytics">
      <div className="team-stat">
        <span className="stat-title">Champion Kills</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].kills,
            pair[1].kills,
          ])}
        />
      </div>
      <div className="team-stat">
        <span className="stat-title">Damage Dealt</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalDamageDealtToChampions,
            pair[1].totalDamageDealtToChampions,
          ])}
        />
      </div>
      <div className="team-stat">
        <span className="stat-title">Damage Taken</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalDamageTaken,
            pair[1].totalDamageTaken,
          ])}
        />
      </div>
      <div className="team-stat">
        <span className="stat-title">Gold Income</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].goldEarned,
            pair[1].goldEarned,
          ])}
        />
      </div>
      <div className="team-stat">
        <span className="stat-title">CS Score</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].totalMinionsKilled + pair[0].neutralMinionsKilled,
            pair[1].totalMinionsKilled + pair[1].neutralMinionsKilled,
          ])}
        />
      </div>
      <div className="team-stat">
        <span className="stat-title">Wards Placed</span>
        <DuoVerticalBarCharts
          participants={participants}
          rolePairs={Array.from(rolePairs.values()).map((pair) => [
            pair[0].wardsPlaced,
            pair[1].wardsPlaced,
          ])}
        />
      </div>
    </div>
  );
}
