export default function getChampionSplash(id, version) {
  const CHAMPION_URL = `http://ddragon.leagueoflegends.com/cdn/img/champion/{id}.jpg`;

  return CHAMPION_URL.replace(/{id}/gi, id);
}
