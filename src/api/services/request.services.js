import { axiosConfig } from "../index";

/* takes in a summoners name and returns JSON object of Summoners info. */
export const getSumByName = async (name, region) => {
  const link = `/summoner/v4/summoners/by-name/${name}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* takes puuid and returns JSON array of last 10 matches */
export const getMatches = async (puuid) => {
  const link = `https://cors.bridged.cc/https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
};

/* takes matchId and returns match timeline info */
export const getMatchTimeline = async (matchId) => {
  /* generates link to retrieve data from */
  const link = `https://cors.bridged.cc/https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoners rank info */
export const getRankedInfo = async (sumId) => {
  /* generates link to retrieve data from */
  const link = `https://cors.bridged.cc/https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoners mastery data */
export const getChampMastery = async (sumId) => {
  /* generates link to retrieve data from */
  const link = `https://cors.bridged.cc/https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${sumId}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns rune shards data */
export const getRuneShards = async () => {
  /* generates link to retrieve data from */
  const link =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json";
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns basic data on all champions */
export const getAllChampData = async (version) => {
  /* generates link to retrieve data from */
  const link = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns in detail data on a single passed champion */
export const getSingleChampData = async (version, champId) => {
  /* generates link to retrieve data from */
  const link = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champId}.json`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns runes data */
export const getRuneData = async (version) => {
  /* generates link to retrieve data from */
  const link = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoner spells data */
export const getSpellData = async (version) => {
  /* generates link to retrieve data from */
  const link = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns items data */
export const getItemData = async (version) => {
  /* generates link to retrieve data from */
  const link = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns latest version of Data Dragon */
export const getDDragonVersion = async () => {
  /* generates link to retrieve data from */
  const link = "http://ddragon.leagueoflegends.com/api/versions.json";
  try {
    const response = await axiosConfig.get(link);
    return response.data?.[0];
  } catch (error) {
    console.error(error);
  }
};
