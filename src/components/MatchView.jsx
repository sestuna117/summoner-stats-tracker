import React, {useContext, useState} from "react";
import getChampionUrl from "../util/getChampionUrl";
import getSummonerSpellUrl from '../util/getSummonerSpellUrl'
import "./MatchView.css";
import {ChampionDataContext, DDragonVersionContext, RuneDataContext, SumsDataContext} from "../hook";
import getRuneUrl from "../util/getRuneUrl";

const TEAM = {
    blue: 100,
    red: 200,
};

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

function ChampSprite(props) {
    const dDragon = useContext(DDragonVersionContext);
    const champData = useContext(ChampionDataContext);
    const {participant, isPlayer} = props;

    let champId = Object.values(champData.data).find(champ => parseInt(champ.key) === participant?.championId);

    return isPlayer ? (
        <img className="player-sprite" src={getChampionUrl(champId.id, dDragon)} alt={`${champId.id}`}/>
    ) : (
        <img className="champ-sprite" src={getChampionUrl(champId.id, dDragon)} alt={`${champId.id}`}/>
    );
}

function PerksSpells(props) {
    const dDragon = useContext(DDragonVersionContext);
    const sumsData = useContext(SumsDataContext);
    const runeData = useContext(RuneDataContext);
    const {participant} = props;
    const allRunePage = runeData.flatMap(page => page.slots.flatMap(slot => slot.runes));

    let sum1 = Object.values(sumsData.data).find(sums => parseInt(sums.key) === participant?.summoner1Id);
    let sum2 = Object.values(sumsData.data).find(sums => parseInt(sums.key) === participant?.summoner2Id);
    let rune1 = allRunePage.find(runes => runes.id === participant?.perks?.styles[0].selections[0]?.perk);
    let rune2 = runeData.find(runes => runes.id === participant?.perks?.styles[1].style);

    return (
        <div>
            <img className="sum-spell" src={getSummonerSpellUrl(sum1?.id, dDragon)} alt={sum1}/>
            <img className="sum-spell" src={getSummonerSpellUrl(sum2?.id, dDragon)} alt={sum2}/>
            <img className="sum-rune" src={getRuneUrl(rune1?.icon)} alt={sum2}/>
            <img className="sum-rune" src={getRuneUrl(rune2?.icon)} alt={sum2}/>
        </div>
    );
}

function PlayersMatchup(props) {
    const {participants} = props;

    return (
        <table>

        </table>
    );
}

function MatchView(props) {
    const {match, puuid} = props;
    const participants = new Map();
    const champData = useContext(ChampionDataContext);
    const [showFull, setShowFull] = useState(false);

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

    function getGameType() {
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

    function displayFullData () {
        setShowFull(prev => !prev);
    }

    return (
        <li>
            <div>{getGameType()}</div>
            <ChampSprite participant={player} isPlayer={true}/>
            <PerksSpells participant={player}/>
            <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
            <p>{player.win ? (
                "Victory"
            ) : (
                "Defeat"
            )
            }</p>
            <PlayersMatchup participants={participants} />
            <button className="dropdown-match-info" type={"button"} onClick={displayFullData}>Display</button>
            {showFull ? <div>
                {Array.from(participants.entries()).map(([id, participants]) => (
                    <Team key={id} participants={participants} id={id} champData={champData}/>
                ))}
            </div> : null }
        </li>
    );
}

export default MatchView;