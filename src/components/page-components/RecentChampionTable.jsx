import React from "react";
import ChampionStatBar from "./ChampionStatBar";
import useSortableData from "../useSortableData";
import "./RecentChampionTable.css";

export default function RecentChampionTable(props) {
  const { usedChamps, maxPlayed } = props;
  const { items, requestSort, sortConfig } = useSortableData(usedChamps);
  console.log(sortConfig);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="winrate-table-container">
      <table className="winrate-table">
        <thead>
          <tr className="winrate-table-header">
            <th
              className={getClassNamesFor("name")}
              onClick={() => {
                requestSort("name");
              }}
            >
              Name
            </th>
            <th
              className={getClassNamesFor("played")}
              onClick={() => {
                requestSort("played");
              }}
            >
              Played
            </th>
            <th
              className={getClassNamesFor("winrate")}
              onClick={() => {
                requestSort("winrate");
              }}
            >
              Winrate
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((champ) => (
            <ChampionStatBar
              key={champ.id}
              champStats={champ}
              maxPlayed={maxPlayed}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
