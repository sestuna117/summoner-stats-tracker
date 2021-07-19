export default function getMap(id, version) {
  const ABILITY_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/map/map{id}.png`;

  return ABILITY_URL.replace(/{id}/gi, id);
}
