import React, {useContext, useState} from "react";
import getChampionUrl from "../util/getChampionUrl";
import getSummonerSpellUrl from '../util/getSummonerSpellUrl'
import "./MatchView.css";
import {ChampionDataContext, DDragonVersionContext, RuneDataContext, SumsDataContext} from "../hook";

const TEAM = {
    blue: 100,
    red: 200,
};

function ChampSprite(props) {
    const dDragon = useContext(DDragonVersionContext);
    const champData = useContext(ChampionDataContext);
    const {participant} = props;

    let champId = Object.values(champData.data).find(champ => parseInt(champ.key) === participant?.championId);

    return (
        <img className="champ-sprite" src={getChampionUrl(champId.id, dDragon)} alt={`${champId.id}`}/>
    );
}

function PerksSpells(props) {
    const dDragon = useContext(DDragonVersionContext);
    const sumsData = useContext(SumsDataContext);
    const runeData = useContext(RuneDataContext);
    const {participant} = props;

    let sum1 = Object.values(sumsData.data).find(sums => parseInt(sums.key) === participant?.summoner1Id);
    let sum2 = Object.values(sumsData.data).find(sums => parseInt(sums.key) === participant?.summoner2Id);
    let rune1 = sumsData.data.find(runes => parseInt(runes.id) === participant?.perks?.styles[0].selections[0]?.perk);
    let rune2 = sumsData.data.find(runes => parseInt(runes.id) === participant?.perks?.styles[1].style);


    return (
        <div>
            <img className="sum-spell" src={getSummonerSpellUrl(sum1, dDragon)} alt={sum1}/>
            <img className="sum-spell" src={getSummonerSpellUrl(sum2, dDragon)} alt={sum2}/>
        </div>
    );
}

function Team(props) {
    const {participants, id} = props;
    const isBlue = id === TEAM.blue;

    return isBlue ? (
        <ul className="team team-blue">
            {participants.map(participant => (
                <li key={participant.puuid}>
                    <ChampSprite participant={participant}/>
                    {`${participant.summonerName}: ${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                </li>
            ))}
        </ul>
    ) : (
        <ul className="team team-red">
            {participants.map(participant => (
                <li key={participant.puuid}>
                    <ChampSprite participant={participant}/>
                    {`${participant.summonerName}: ${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                </li>
            ))}
        </ul>
    );
}

function MatchView(props) {
    const {match, puuid} = props;
    const participants = new Map();
    const champData = useContext(ChampionDataContext);

    let player;
    match.info.participants.forEach(participant => {
        if (participant.puuid === puuid) {
            player = participant;
        }
        const teamId = participant.teamId;
        let team = participants.get(teamId);
        if (!team) {
            participants.set(teamId, team = []);
        }
        team.push(participant);
    });
    console.log(participants);

    const getGameType = () => {
        switch (match.info.queueId) {
            case 400:
                return 'Normal Draft';
            case 420:
                return 'Ranked Solo/Duo';
            case 430:
                return 'Normal Blind';
            case 440:
                return 'Ranked Flex';
            case 450:
                return 'ARAM';
            default:
                return 'Customs';
        }
    }

    return (
        <li>
            <div>{getGameType()}</div>
            <ChampSprite participant={player}/>
            {/*<PerksSpells />*/}
            <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
            <p>{player.win ? (
                "Victory"
            ) : (
                "Defeat"
            )
            }</p>
            <div>
                {Array.from(participants.entries()).map(([id, participants]) => (
                    <Team key={id} participants={participants} id={id} champData={champData}/>
                ))}
            </div>
        </li>
    );
}

export default MatchView;