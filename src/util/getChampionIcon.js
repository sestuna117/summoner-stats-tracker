export default function getChampionIcon(id, version) {
  const CHAMPION_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/{id}.png`;

  return CHAMPION_URL.replace(/{id}/gi, id);
}
