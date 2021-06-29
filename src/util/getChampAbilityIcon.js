export default function getChampAbilityIcon(id, version) {
  const ABILITY_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/{id}.png`;

  return ABILITY_URL.replace(/{id}/gi, id);
}
