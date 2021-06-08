import axios from "axios";

const riotKey = 'RGAPI-830bd8a0-4fc6-4987-87ea-16767a64b83a';

export const axiosConfig = axios.create({
    baseURL: "https://cors.bridged.cc/https://na1.api.riotgames.com/lol",
    params: {
        api_key: riotKey
    }
});