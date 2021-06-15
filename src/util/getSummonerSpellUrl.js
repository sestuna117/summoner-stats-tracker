export default function getSpellUrl(id, version) {
    const SPELL_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/{id}.png`;

    return SPELL_URL.replace(/{id}/gi, id);
}