export default function getAvatarIcon(id, version) {
    const AVATAR_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/{id}.png`;

    return AVATAR_URL.replace(/{id}/gi, id);
}