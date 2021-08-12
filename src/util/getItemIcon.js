export default function getItemIcon(id, version) {
  const ITEM_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/{id}.png`;

  return ITEM_URL.replace(/{id}/gi, id);
}
