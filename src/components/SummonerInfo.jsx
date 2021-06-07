/* takes in a Summoners name and my Riot API key and returns JSON of Summoners info. */
const getSumByName = async (name, riotKey) => {
    /* generates link to retrieve data from */
    const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/ ${name}?api_key=${riotKey}`;
    try {
        const response = await fetch(link);
        return response.json();
    } catch (error) {
        console.log("some error with getting summoner data");
    }
}

