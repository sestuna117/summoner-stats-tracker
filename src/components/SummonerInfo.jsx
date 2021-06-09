import React, {useState} from "react";
import {getMatchInfo, getMatches, getSumByName} from '../api/services/request.services';
import MatchView from "./MatchView";

export function SummonerInfo() {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('na1');
    const [data, setData] = useState();
    const [matches, setMatches] = useState([]);

    const getProfile = async () => {
        setMatches([]);
        let matchIds = [];
        try {
            const result = await getSumByName(name, region);
            console.log(result);
            setData(result);
            const matches = await getMatches(result.puuid);
            console.log(matches);
            matchIds = matches;
        } catch (e) {
            console.error(e);
            return;
        }

        const promises = matchIds.map(async id => {
            try {
                const match = await getMatchInfo(id);
                setMatches(prev => (
                    [...prev, match]
                ));
            } catch (e) {
                console.error(e);
            }
        });

        await Promise.all(promises);
        alert('aifinised');
    }

    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault();
                getProfile();
                return false;
            }}>
                <input value={name} type={"text"} placeholder={"Input Summoner Name..."}
                       onChange={e => setName(e.target.value)}/>
                <button type={"submit"}>Search</button>
                <select value={region} onChange={e => setRegion(e.target.value)}>
                    <option value={'br1'}>BR</option>
                    <option value={'eun1'}>EUNE</option>
                    <option value={'euw1'}>EUW</option>
                    <option value={'jp1'}>JP</option>
                    <option value={'kr1'}>KR</option>
                    <option value={'la1'}>LAN</option>
                    <option value={'la2'}>LAS</option>
                    <option value={'na1'}>NA</option>
                    <option value={'oc1'}>OCE</option>
                    <option value={'ru'}>RU</option>
                    <option value={'tr1'}>TR</option>
                </select>
            </form>
            <div>
                <h2>{data?.name}</h2>
                {data?.summonerLevel ?? "data not loaded"}
            </div>
            <ul>
                {matches?.sort((a,b) => b.info.gameCreation - a.info.gameCreation).map(match => (
                    <MatchView match={match} puuid={data.puuid}/>
                ))}
            </ul>
        </div>
    )
}

/*
* make new component MatchView
* pass match data
* return rendered match data */