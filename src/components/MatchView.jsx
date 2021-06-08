import React from "react";

function MatchView(props) {
    const {match} = props;
    return (
        <li key={match.metadata.matchId}>
            <ul>
                {match.info.participants.map(participant => (
                    <li key={participant.summonerId}>
                        {participant.summonerName}
                        {`${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default MatchView;