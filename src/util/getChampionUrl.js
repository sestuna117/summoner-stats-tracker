export default function getChampionUrl(id, version) {
    const CHAMPION_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/{id}.png`;

    return CHAMPION_URL.replace(/{id}/gi, id);
}

