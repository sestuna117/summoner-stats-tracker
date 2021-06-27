export default function getShardIcon(path) {
  const SHARD_URL = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path}`;

  return SHARD_URL.replace(/lol-game-data/gi, "plugins").replace(
    /assets/gi,
    "rcp-be-lol-game-data/global/default".toLowerCase
  );
}
