import React, { useEffect, useState } from "react";
import "./SideContent.css";
import cx from "classnames";
import RecentlyPlayedWithTable from "./RecentlyPlayedWithTable";

export default function RecentlyPlayedWithSection(props) {
  const { matches, player, numOfMatches } = props;
  const [playedWith, setPlayedWith] = useState(new Map());
  const [maxPlayed, setMaxPlayed] = useState(0);
  const [toggleDisplay, setToggleDisplay] = useState(true);

  useEffect(() => {
    if (numOfMatches === 0 || !player || !(matches.length === numOfMatches)) {
      return;
    }
    matches.forEach((match) => {
      const { participants } = match.info;
      const playersTeam = participants.find(
        (participant) => participant.puuid === player
      ).teamId;
      const teammates = participants.filter(
        ({ teamId, puuid }) => teamId === playersTeam && puuid !== player
      );

      let playerData;
      const amountPlayed = new Map();
      teammates.forEach((member) => {
        const { puuid, summonerName, win } = member;
        if (!amountPlayed.has(puuid)) {
          amountPlayed.set(puuid, {
            played: 0,
            name: summonerName,
            wins: 0,
          });
        }
        playerData = amountPlayed.get(puuid);
        playerData.played++;
        if (win) {
          playerData.wins++;
        }
        amountPlayed.set(puuid, playerData);
      });

      Array.from(amountPlayed.entries()).forEach(([id, player]) => {
        if (!playedWith.has(id)) {
          setPlayedWith(new Map(playedWith.set(id, player)));
        } else {
          const updatedData = playedWith.get(id);
          Object.keys(updatedData).forEach((stat) => {
            if (stat === "name") {
              return;
            }
            updatedData[stat] += player[stat];
          });
          setPlayedWith(new Map(playedWith.set(id, updatedData)));
        }
      });
    });
  }, [matches, player]);

  useEffect(() => {
    if (!playedWith) {
      return;
    }
    let max = 0;
    Array.from(playedWith.values()).forEach((player) => {
      const { played } = player;
      if (played > max) {
        max = played;
      }
    });
    setMaxPlayed(max);
  }, [playedWith]);

  return (
    <div className="side-section side-section-dropdown">
      <div
        className="side-section-title"
        onClick={() => setToggleDisplay((prev) => !prev)}
      >
        <span className="side-section-title-text">Recently Played With</span>
        <span>{String.fromCharCode(toggleDisplay ? 9661 : 9651)}</span>
      </div>
      <div
        className={cx("side-section-container", {
          "side-section-tab-closed": !toggleDisplay,
        })}
      >
        <RecentlyPlayedWithTable
          teammates={Array.from(playedWith.values())
            .map((player) => {
              player.winrate = (player.wins / player.played) * 100;

              return player;
            })
            .filter(({ played }) => played > 1)}
          maxPlayed={maxPlayed}
        />
      </div>
    </div>
  );
}
