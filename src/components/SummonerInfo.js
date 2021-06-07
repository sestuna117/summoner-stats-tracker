import React, { useState } from "react";
import {getMatches, getSumByName} from '../api/services/request.services';

export function SummonerInfo() {
    const [name, setName] = useState('ShyShio');
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
                <button type={"button"} onClick={() => getProfile()}>Search</button>
            </form>
            <div>
                {data?.summonerLevel ?? "data not loaded"}
            </div>
        </div>
    )
}