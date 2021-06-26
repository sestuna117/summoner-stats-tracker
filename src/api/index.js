import axios from "axios";

const RIOT_KEY = process.env.REACT_APP_API_KEY;

export const axiosConfig = axios.create({
  baseURL: "https://cors.bridged.cc/https://na1.api.riotgames.com/lol",
  params: {
    api_key: RIOT_KEY,
  },
});
