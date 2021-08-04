import React, { useEffect, useState } from "react";
import ChampionStatBar from "./ChampionStatBar";
import "./RecentChampionSection.css";
import cx from "classnames";

export default function RecentChampionSection(props) {
  const { matches, player } = props;
  const [usedChamps, setUsedChamps] = useState(new Map());
  const [maxPlayed, setMaxPlayed] = useState(0);
  const [toggleDisplay, setToggleDisplay] = useState(true);

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

  useEffect(() => {
    if (!usedChamps) {
      return;
    }
    let max = 0;
    Array.from(usedChamps.values()).forEach((types) => {
      let sum = types.reduce((total, type) => total + type.played, 0);
      if (sum > max) {
        max = sum;
      }
    });
    setMaxPlayed(max);
  }, [usedChamps]);

  return (
    <div className="winrate-section">
      <div
        className="winrate-title"
        onClick={() => setToggleDisplay((prev) => !prev)}
      >
        <span className="winrate-title-text">Recent Champion Summary</span>
        <span>{String.fromCharCode(toggleDisplay ? 9661 : 9651)}</span>
      </div>
      <div
        className={cx("winrate-container", {
          "winrate-closed": toggleDisplay,
        })}
      >
        <table className="winrate-table">
          <tbody>
            <tr className="winrate-table-header">
              <th>Name</th>
              <th>Played</th>
              <th>Winrate</th>
            </tr>
            {Array.from(usedChamps.entries()).map(([id, values]) => (
              <ChampionStatBar
                key={id}
                id={id}
                matchTypes={values}
                maxPlayed={maxPlayed}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
