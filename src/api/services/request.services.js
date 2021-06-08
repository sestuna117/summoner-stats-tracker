import {axiosConfig} from "../index";

/* takes in a summoners name and returns JSON object of Summoners info. */
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

/* takes puuid and returns JSON array of last 20 matches */
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

/* takes matchId and returns JSON  of match info */
export const getMatchInfo = async (matchId) => {
    /* generates link to retrieve data from */
    const link = `https://cors.bridged.cc/https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    try {
        const response = await axiosConfig.get(link);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}