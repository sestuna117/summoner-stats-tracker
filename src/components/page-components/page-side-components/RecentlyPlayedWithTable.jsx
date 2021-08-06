import React from "react";
import useSortableData from "../../useSortableData";
import WinRateTableTHead from "./WinRateTableTHead";
import PlayerStatBar from "./PlayerStatBar";

export default function RecentlyPlayedWithTable(props) {
  const { teammates, maxPlayed } = props;
  const { items, requestSort, sortConfig } = useSortableData(teammates);
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
          {items.map((player) => (
            <PlayerStatBar playerStats={player} maxPlayed={maxPlayed} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
