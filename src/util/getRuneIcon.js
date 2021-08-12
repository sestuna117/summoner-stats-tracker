export default function getRuneIcon(icon) {
  const RUNE_URL = `https://ddragon.leagueoflegends.com/cdn/img/{icon}`;

  return RUNE_URL.replace(/{icon}/gi, icon);
}
