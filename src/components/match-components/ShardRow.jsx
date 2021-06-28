import React from "react";
import "./ShardRow.css";
import Shard from "./Shard";

export default function ShardRow(props) {
  const { player, row, shardTypes } = props;

  return (
    <div>
      {row.map((shard) => (
        <Shard
          key={shard}
          shard={shard}
          player={player}
          shardTypes={shardTypes}
        />
      ))}
    </div>
  );
}
