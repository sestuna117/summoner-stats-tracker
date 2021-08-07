export default function getChampionSplash(id) {
  const CHAMPION_URL = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/{id}/{id}000.jpg`;

  return CHAMPION_URL.replace(/{id}/gi, id);
}
