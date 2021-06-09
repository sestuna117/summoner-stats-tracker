import React from "react";

function MatchView(props) {
    const {match, puuid} = props;
    const blueSide = match.info.participants.slice(0, 5);
    const redSide = match.info.participants.slice(5, 10);
    const player = match.info.participants.find(participant => participant.puuid === puuid);


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
        <li key={match.metadata.matchId}>
            <div>{getGameType()}</div>
            <p>{`${player.summonerName}: ${player.kills} / ${player.deaths} / ${player.assists}`}</p>
            <div>
                <ul>
                    {blueSide.map(participant => (
                        <li key={participant.summonerId}>
                            {`${participant.summonerName}: ${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                        </li>
                    ))}
                </ul>
                <ul>
                    {redSide.map(participant => (
                        <li key={participant.summonerId}>
                            {`${participant.summonerName}: ${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

export default MatchView;