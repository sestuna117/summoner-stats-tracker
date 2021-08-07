import React, { useEffect, useState } from "react";
import "./RecentChampionSection.css";
import "./SideContent.css";
import cx from "classnames";
import RecentChampionTable from "./RecentChampionTable";

export default function RecentChampionSection(props) {
  const { matches, player, numOfMatches } = props;
  const [usedChamps, setUsedChamps] = useState(new Map());
  const [maxPlayed, setMaxPlayed] = useState(0);
  const [toggleDisplay, setToggleDisplay] = useState(true);
  const [activeTab, setActiveTab] = useState("total-champs-used");

  async function loadChampions() {
    const newChamps = new Map();
    matches.forEach((match) => {
      const { queueId, participants } = match.info;
      const { championId, championName, kills, deaths, assists, win } =
        participants.find((participant) => participant.puuid === player.puuid);
      let champData;
      if (!newChamps.has(championId)) {
        newChamps.set(championId, [
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
            name: championName,
            id: championId,
          },
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
            name: championName,
            id: championId,
          },
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
            name: championName,
            id: championId,
          },
          {
            kills: 0,
            deaths: 0,
            assists: 0,
            played: 0,
            wins: 0,
            name: championName,
            id: championId,
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
            if (stat === "id" || stat === "name") {
              return;
            }
            type[stat] += champData[index][stat];
          });
        });
        setUsedChamps(new Map(usedChamps.set(id, updatedData)));
      }
    });
  }

  useEffect(() => {
    if (numOfMatches === 0 || !player || !(matches.length === numOfMatches)) {
      return;
    }
    loadChampions();
  }, [matches, player, numOfMatches]);

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
    <div className="side-section side-section-dropdown">
      <div
        className="side-section-title"
        onClick={() => setToggleDisplay((prev) => !prev)}
      >
        <span className="side-section-title-text">Recent Champion Summary</span>
        <span>{String.fromCharCode(toggleDisplay ? 9661 : 9651)}</span>
      </div>
      <div
        className={cx("side-section-container", {
          "side-section-tab-closed": !toggleDisplay,
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
        <RecentChampionTable
          usedChamps={Array.from(usedChamps.entries()).map(([id, queues]) => {
            let champ =
              queues[
                activeTab === "total-champs-used"
                  ? 3
                  : activeTab === "flex-champs-used"
                  ? 2
                  : activeTab === "solo-champs-used"
                  ? 1
                  : 0
              ];
            champ.winrate = (champ.wins / champ.played) * 100;

            return champ;
          })}
          maxPlayed={maxPlayed}
        />
      </div>
    </div>
  );
}
