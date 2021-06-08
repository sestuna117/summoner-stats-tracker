import axios from "axios";

const riotKey = '';

export const axiosConfig = axios.create({
    baseURL: "https://cors.bridged.cc/https://na1.api.riotgames.com/lol",
    params: {
        api_key: riotKey
    }
});