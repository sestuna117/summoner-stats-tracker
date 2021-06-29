import React, { useContext } from "react";
import ShardRow from "./ShardRow";
import { RuneShardsDataContext } from "../../hook";

const OFFENSE = [5008, 5005, 5007];
const FLEX = [5008, 5002, 5003];
const DEFENSE = [5001, 5002, 5003];

const SHARD_ID_REGEX = /^500[0-9]$/;

export default function RuneShards(props) {
  const { playerShards } = props;

  const shardData = useContext(RuneShardsDataContext);

  const shardTypes = shardData.filter((rune) =>
    rune?.id.toString().match(SHARD_ID_REGEX)
  );

  return (
    <div className="rune-shards">
      <div className="shard-offensive">
        <ShardRow
          playerShard={playerShards.offense}
          row={OFFENSE}
          shardTypes={shardTypes}
        />
      </div>
      <div className="shard-flex">
        <ShardRow
          playerShard={playerShards.flex}
          row={FLEX}
          shardTypes={shardTypes}
        />
      </div>
      <div className="shard-defensive">
        <ShardRow
          playerShard={playerShards.defense}
          row={DEFENSE}
          shardTypes={shardTypes}
        />
      </div>
    </div>
  );
}
