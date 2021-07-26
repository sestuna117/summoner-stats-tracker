export default function getMatchHistoryIcon(asset, team) {
  const OBJECT_URL = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/${asset}{team}.png`;

  return OBJECT_URL.replace(/{team}/gi, team);
}
