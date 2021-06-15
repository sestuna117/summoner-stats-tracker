export default function getRuneUrl(icon) {
    const SPELL_URL = `http://ddragon.leagueoflegends.com/cdn/img/{icon}`;

    return SPELL_URL.replace(/{icon}/gi, icon);
}