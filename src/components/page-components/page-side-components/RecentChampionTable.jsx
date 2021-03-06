import React from "react";
import ChampionStatBar from "./ChampionStatBar";
import useSortableData from "../../useSortableData";
import "./WinRateTable.css";
import WinRateTableTHead from "./WinRateTableTHead";

export default function RecentChampionTable(props) {
  const { usedChamps, maxPlayed } = props;
  const { items, requestSort, sortConfig } = useSortableData(usedChamps);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="winrate-table-container">
      <table className="winrate-table">
        <WinRateTableTHead
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
        />
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
