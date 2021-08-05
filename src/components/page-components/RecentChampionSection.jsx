import React, { useEffect, useState } from "react";
import ChampionStatBar from "./ChampionStatBar";
import "./RecentChampionSection.css";
import cx from "classnames";

export default function RecentChampionSection(props) {
  const { matches, player } = props;
  const [usedChamps, setUsedChamps] = useState(new Map());
  const [maxPlayed, setMaxPlayed] = useState(0);
  const [toggleDisplay, setToggleDisplay] = useState(true);
  const [activeTab, setActiveTab] = useState("total-used-champs");

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
      champData[3].kills += kills;
      champData[3].deaths += deaths;
      champData[3].assists += assists;
      champData[3].played++;
      if (win) {
        champData[id].wins++;
        champData[3].wins++;
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
    let index;
    switch (activeTab) {
      case "norm-champs-used":
        index = 0;
        break;
      case "solo-champs-used":
        index = 1;
        break;
      case "flex-champs-used":
        index = 2;
        break;
      default:
        index = 3;
    }
    let max = 0;
    Array.from(usedChamps.values()).forEach((types) => {
      let mostPlayed = types[index].played;
      if (mostPlayed > max) {
        max = mostPlayed;
      }
    });
    setMaxPlayed(max);
  }, [usedChamps, activeTab]);

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
          "winrate-tab-closed": toggleDisplay,
        })}
      >
        <form>
          <button
            className={cx("queue-tab", {
              "queue-tab-open": activeTab === "total-champs-used",
            })}
            type="button"
            onClick={() => setActiveTab("total-champs-used")}
          >
            Total
          </button>
          <button
            className={cx("queue-tab", {
              "queue-tab-open": activeTab === "solo-champs-used",
            })}
            type="button"
            onClick={() => setActiveTab("solo-champs-used")}
          >
            Ranked Solo
          </button>
          <button
            className={cx("queue-tab", {
              "queue-tab-open": activeTab === "flex-champs-used",
            })}
            type="button"
            onClick={() => setActiveTab("flex-champs-used")}
          >
            Ranked Flex
          </button>
          <button
            className={cx("queue-tab", {
              "queue-tab-open": activeTab === "norm-champs-used",
            })}
            type="button"
            onClick={() => setActiveTab("norm-champs-used")}
          >
            Other
          </button>
        </form>
        <div className="winrate-table-container">
          <table className="winrate-table">
            <thead>
              <tr className="winrate-table-header">
                <th>Name</th>
                <th>Played</th>
                <th>Winrate</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(usedChamps.entries()).map(([id, values]) => (
                <ChampionStatBar
                  key={id}
                  id={id}
                  matchTypes={
                    values[
                      activeTab === "total-champs-used"
                        ? 3
                        : activeTab === "flex-champs-used"
                        ? 2
                        : activeTab === "solo-champs-used"
                        ? 1
                        : 0
                    ]
                  }
                  maxPlayed={maxPlayed}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
