export default function getRuneUrl(icon) {
    const RUNE_URL = `http://ddragon.leagueoflegends.com/cdn/img/{icon}`;

    return RUNE_URL.replace(/{icon}/gi, icon);
}