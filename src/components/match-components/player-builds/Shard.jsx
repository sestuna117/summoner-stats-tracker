import React from "react";
import getShardIcon from "../../../util/getShardIcon";
import "./Shard.css";
import cx from "classnames";

export default function Shard(props) {
  const { shard, shardTypes, playerShard } = props;

  const shardInfo = shardTypes.find((shardType) => shardType.id === shard);

  return (
    <img
      className={cx("shard", { "shard-inactive": shard !== playerShard })}
      src={getShardIcon(shardInfo.iconPath)}
      alt={shardInfo.name}
    />
  );
}
