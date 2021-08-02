import React, { useEffect, useState } from "react";

export default function WinRatesSection(props) {
  const { matches, player } = props;
  const usedChamps = new Map();

  // const CHAMPION_USE_DATA = {
  //   total: {
  //     kills: sumUpMatchesData("kills", MATCH_TYPES),
  //     deaths: sumUpMatchesData("deaths", MATCH_TYPES),
  //     assists: sumUpMatchesData("assists", MATCH_TYPES),
  //     played: sumUpMatchesData("played", MATCH_TYPES),
  //     wins: sumUpMatchesData("wins", MATCH_TYPES),
  //   },
  // };
  //
  // function sumUpMatchesData(stat, matchTypes) {
  //   let sum;
  //   matchTypes.forEach((type) => {
  //     sum += type[stat];
  //   });
  //   return sum;
  // }

  useEffect(async () => {
    if (!player || !(matches.length % 10 === 0)) {
      return;
    }
    matches.forEach((match) => {
      const { queueId, participants } = match.info;
      const { championId, kills, deaths, assists, win } = participants.find(
        (participant) => participant.puuid === player.puuid
      );
      if (!usedChamps.has(championId)) {
        usedChamps.set(championId, [
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
      const champData = usedChamps.get(championId);
      let id = 0;
      if (queueId === 420) {
        id = 1;
      } else if (queueId === 440) {
        id = 2;
      }
      console.log(id);

      champData[id].kills += kills;
      champData[id].deaths += deaths;
      champData[id].assists += assists;
      champData[id].played++;
      if (win) {
        champData[id].wins++;
      }
      usedChamps.set(championId, champData);
    });
    console.log(usedChamps);
  }, [matches, player]);

  return <div></div>;
}
