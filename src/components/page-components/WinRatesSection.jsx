import React, { useEffect, useState } from "react";
import ChampionStatBar from "./ChampionStatBar";
import "./WinRatesSection.css";

export default function WinRatesSection(props) {
  const { matches, player } = props;
  const [usedChamps, setUsedChamps] = useState(new Map());

  useEffect(async () => {
    if (!player || !(matches.length % 10 === 0)) {
      return;
    }
    const newChamps = new Map();
    matches.forEach((match) => {
      const { queueId, participants } = match.info;
      const { championId, kills, deaths, assists, win } = participants.find(
        (participant) => participant.puuid === player.puuid
      );
      let champData;
      if (!newChamps.has(championId)) {
        newChamps.set(championId, [
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
          },
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
          },
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
          },
        ]);
      }
      champData = newChamps.get(championId);
      let id = 0;
      if (queueId === 420) {
        id = 1;
      } else if (queueId === 440) {
        id = 2;
      }

      champData[id].kills += kills;
      champData[id].deaths += deaths;
      champData[id].assists += assists;
      champData[id].played++;
      if (win) {
        champData[id].wins++;
      }
      newChamps.set(championId, champData);
    });
    Array.from(newChamps.entries()).forEach(([id, champData]) => {
      if (!usedChamps.has(id)) {
        setUsedChamps(new Map(usedChamps.set(id, champData)));
      } else {
        const updatedData = usedChamps.get(id);
        updatedData.forEach((type, index) => {
          Object.keys(type).forEach((stat) => {
            type[stat] += champData[index][stat];
          });
        });
        setUsedChamps(new Map(usedChamps.set(id, updatedData)));
      }
    });
  }, [matches, player]);
  console.log(usedChamps);

  return (
    <div className="winrate-section">
      <div>Current Champions used in Displayed Matches</div>
      {Array.from(usedChamps.entries()).map(([id, values]) => (
        <ChampionStatBar key={id} id={id} matchTypes={values} />
      ))}
    </div>
  );
}
