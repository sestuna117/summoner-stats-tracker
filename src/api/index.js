import axios from "axios";

const riotKey = 'RGAPI-1a29cd1b-87ca-4a15-adbe-c0f8252b8a17';

export const axiosConfig = axios.create({
    baseURL: "https://cors.bridged.cc/https://na1.api.riotgames.com/lol",
    params: {
        api_key: riotKey
    }
});