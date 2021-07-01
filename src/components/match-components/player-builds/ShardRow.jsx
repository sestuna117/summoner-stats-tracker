import React from "react";
import "./ShardRow.css";
import Shard from "./Shard";

export default function ShardRow(props) {
  const { playerShard, row, shardTypes } = props;

  return (
    <div className="shard-container">
      {row.map((shard) => (
        <Shard
          key={shard}
          shard={shard}
          playerShard={playerShard}
          shardTypes={shardTypes}
        />
      ))}
    </div>
  );
}
