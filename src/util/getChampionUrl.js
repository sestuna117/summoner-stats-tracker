const CHAMPION_URL = 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/{id}.png';

export default function getChampionUrl(id) {
    return CHAMPION_URL.replace(/{id}/gi, id);
}