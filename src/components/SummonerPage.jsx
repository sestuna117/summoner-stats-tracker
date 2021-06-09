import React, {useState} from 'react';
import {getMatchInfo, getMatches, getSumByName} from '../api/services/request.services';
import MatchView from './MatchView';
import './SummonerPage.css';
import getAvatarUrl from "../util/getAvatarUrl";

function NavBar(props) {
    const {name, region, getProfile, changeName, changeRegion}= props;
    return (
    <nav className="navbar">
        <a className="navbar-logo" href={"#"}>Home</a>
        <div className="navbar-right">
            <form onSubmit={(event) => {
                event.preventDefault();
                getProfile();
                return false;
            }}>
                <input value={name} type={"text"} placeholder={"Input Summoner Name..."}
                       onChange={e => changeName(e.target.value)}/>
                <button type={"submit"}>Search</button>
                <select value={region} onChange={e => changeRegion(e.target.value)}>
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
        </div>
    </nav>
    );
}

function SummonerInfo(props) {
    const {data} = props;
    return (
        <div>
            <img className="profile-icon" src={getAvatarUrl(data?.profileIconId)} alt={`${data?.profileIconId}.png`}/>
            <h2>{data?.name}</h2>
            {data?.summonerLevel ?? "data not loaded"}
        </div>
    );
}

export function SummonerPage() {
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
    }

    return (
        <div>
            <NavBar name={name} region={region} getProfile={getProfile} changeName={setName} changeRegion={setRegion}/>
            <SummonerInfo data={data}/>
            <ul>
                {matches?.sort((a, b) => b.info.gameCreation - a.info.gameCreation).map(match => (
                    <MatchView key={match.metadata.matchId} match={match} puuid={data.puuid}/>
                ))}
            </ul>
        </div>
    )
}