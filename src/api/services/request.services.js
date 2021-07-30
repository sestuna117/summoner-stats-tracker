import { axiosConfig } from "../index";

/* takes in a summoners name and returns JSON object of Summoners info. */
export const getSumByName = async (name, region) => {
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/summoner/${name}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* takes puuid and returns JSON array of last 10 matches */
export const getMatches = async (sumName, region, start) => {
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/summoner/${sumName}/matches/${start}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* takes matchId and returns JSON  of match info */
export const getMatchInfo = async (matchId, region) => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/matches/${matchId}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* takes matchId and returns match timeline info */
export const getMatchTimeline = async (matchId, region) => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/matches/${matchId}/timeline`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoners rank info */
export const getRankedInfo = async (sumName, region) => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/summoner/${sumName}/ranked`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoners mastery data */
export const getChampMastery = async (sumName, region) => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/${region}/riot/summoner/${sumName}/mastery`;
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
  const link = `${process.env.REACT_APP_API_URL}/cDragon/runeShards`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns basic data on all champions */
export const getAllChampData = async () => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/dDragon/champion`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns in detail data on a single passed champion */
export const getSingleChampData = async (champName) => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/dDragon/champion/${champName}`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns runes data */
export const getRuneData = async () => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/dDragon/rune`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns summoner spells data */
export const getSpellData = async () => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/dDragon/spell`;
  try {
    const response = await axiosConfig.get(link);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* returns items data */
export const getItemData = async () => {
  /* generates link to retrieve data from */
  const link = `${process.env.REACT_APP_API_URL}/dDragon/item`;
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
  const link = `${process.env.REACT_APP_API_URL}/dDragon/version`;
  try {
    const response = await axiosConfig.get(link);
    return response.data.version;
  } catch (error) {
    console.error(error);
  }
};
