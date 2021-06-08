import React, {useState} from "react";
import {getMatches, getSumByName} from '../api/services/request.services';

export function SummonerInfo() {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('na1');
    const [data, setData] = useState();
    const [matches, setMatches] = useState();

    const getProfile = async () => {
        try {
            const result = await getSumByName(name, region);
            console.log(result);
            setData(result);
            const matches = await getMatches(result.puuid);
            console.log(matches);
            setMatches(matches);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <form>
                <input value={name} type={"text"} placeholder={"Input Summoner Name..."}
                       onChange={e => setName(e.target.value)}/>
                <button type={"button"} onClick={() => getProfile()}>Search</button>
            </form>
            <div>
                {data?.summonerLevel ?? "data not loaded"}
            </div>
            <ul>
                {matches.map(match => (
                    <li key={match.matchId}>
                        <div>
                            {match.matchId}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}