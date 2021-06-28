import React, { useContext } from "react";
import ShardRow from "./ShardRow";
import { RuneShardsDataContext } from "../../hook";

const OFFENSE = [5008, 5005, 5007];
const FLEX = [5008, 5002, 5003];
const DEFENSE = [5001, 5002, 5003];

const SHARD_ID_REGEX = /^500[0-9]$/;

export default function RuneShards(props) {
  const { player } = props;

  const shardData = useContext(RuneShardsDataContext);

  let shardTypes = shardData.filter((rune) =>
    rune?.id.toString().match(SHARD_ID_REGEX)
  );
  console.log(shardTypes);

  return (
    <div className="rune-shards">
      <div className="shard-offensive">
        <ShardRow player={player} row={OFFENSE} shardTypes={shardTypes} />
      </div>
      <div className="shard-flex">
        <ShardRow player={player} row={FLEX} shardTypes={shardTypes} />
      </div>
      <div className="shard-defensive">
        <ShardRow player={player} row={DEFENSE} shardTypes={shardTypes} />
      </div>
    </div>
  );
}
