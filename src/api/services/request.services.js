/* takes in a Summoners name and my Riot API key and returns JSON of Summoners info. */
import {axiosConfig} from "../index";

export const getSumByName = async (name, region) => {
    /* generates link to retrieve data from */
    const link = `/summoner/v4/summoners/by-name/${name}`;
    try {
        const response = await axiosConfig.get(link);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getMatches = async (puuid) => {
    /* generates link to retrieve data from */
    const link = `https://cors.bridged.cc/https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    try {
        const response = await axiosConfig.get(link);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}