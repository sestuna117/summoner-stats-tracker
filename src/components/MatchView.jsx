import React, {useContext} from "react";
import {ChampionDataContext} from "../hook/ChampionDataContext";
import getChampionUrl from "../util/getChampionUrl";
import "./MatchView.css";

const TEAM = {
    blue: 100,
    red: 200,
};

function Team(props) {
    const {participants, id} = props;
    const isBlue = id === TEAM.blue;
    const champData = useContext(ChampionDataContext);
    let champId;

    function ChampSprite(props) {
        const {participant} = props;
        champId = Object.values(champData.data).find(champ => parseInt(champ.key) === participant?.championId);

        return (
            <img className="champ-sprite" src={getChampionUrl(champId.id)} alt={`${champId.id}`}/>
        )
    }

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
            <p>{`${player.summonerName}: ${player.kills} / ${player.deaths} / ${player.assists}`}</p>
            <p>{player.win ? (
                "Victory"
            ) : (
                "Defeat"
            )
            }</p>
            <div>
                {Array.from(participants.entries()).map(([id, participants]) => (
                    <Team key={id} participants={participants} id={id}/>
                ))}
            </div>
        </li>
    );
}

export default MatchView;