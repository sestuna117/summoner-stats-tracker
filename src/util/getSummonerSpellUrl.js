const AVATAR_URL = 'http://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/{id}.png';

export default function getAvatarUrl(id) {
    return AVATAR_URL.replace(/{id}/gi, id);
}