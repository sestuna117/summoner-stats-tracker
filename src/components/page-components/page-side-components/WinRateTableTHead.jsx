import React from "react";
import "./WinRateTableTHead.css";

export default function WinRateTableTHead(props) {
  const { getClassNamesFor, requestSort } = props;

  return (
    <thead>
      <tr className="winrate-table-header">
        <th
          className={getClassNamesFor("name")}
          onClick={() => {
            requestSort("name");
          }}
        >
          <span>Name</span>
        </th>
        <th
          className={getClassNamesFor("played")}
          onClick={() => {
            requestSort("played");
          }}
        >
          <span>Played</span>
        </th>
        <th
          className={getClassNamesFor("winrate")}
          onClick={() => {
            requestSort("winrate");
          }}
        >
          <span>Winrate</span>
        </th>
      </tr>
    </thead>
  );
}
