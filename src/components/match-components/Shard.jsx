import React from "react";
import getShardIcon from "../../util/getShardIcon";

export default function Shard(props) {
  const { shard, shardTypes, player } = props;
  const shardInfo = shardTypes.find((shardType) => shardType.id === shard);
  console.log(shardInfo);

  return (
    <img
      className="shard"
      src={getShardIcon(shardInfo.iconPath)}
      alt={shardInfo.name}
    />
  );
}
