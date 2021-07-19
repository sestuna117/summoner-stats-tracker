import React from "react";
import "./StatsTable.css";
import ChampSprite from "../ChampSprite";

export default function StatsTable(props) {
  const { match } = props;
  const TABLE_SECTION_COMBAT = {
    title: "Combat",
    rows: [
      {
        name: "KDA",
        data: match.participants.map(
          ({ kills, deaths, assists }) => `${kills}/${deaths}/${assists}`
        ),
      },
      {
        name: "Largest Killing Spree",
        data: createRow("largestKillingSpree"),
      },
      {
        name: "Largest Multi Kill ",
        data: createRow("largestMultiKill"),
      },
      {
        name: "Crowd Control Score ",
        data: createRow("timeCCingOthers"),
      },
      {
        name: "First Blood ",
        data: match.participants.map((participant) => {
          return participant.firstBloodKill
            ? String.fromCharCode(10003)
            : String.fromCharCode(10007);
        }),
      },
    ],
  };
  const TABLE_SECTION_DMG_DEALT = {
    title: "Damage Dealt",
    rows: [
      {
        name: "Total Damage to Champions",
        data: createRow("totalDamageDealtToChampions"),
      },
      {
        name: "Physical Damage to Champions",
        data: createRow("physicalDamageDealtToChampions"),
      },
      {
        name: "Magic Damage to Champions",
        data: createRow("magicDamageDealtToChampions"),
      },
      {
        name: "True Damage to Champions",
        data: createRow("trueDamageDealtToChampions"),
      },
      {
        name: "Total Damage Dealt",
        data: createRow("totalDamageDealt"),
      },
      {
        name: "Physical Damage Dealt",
        data: createRow("physicalDamageDealt"),
      },
      {
        name: "Magic Damage Dealt",
        data: createRow("magicDamageDealt"),
      },
      {
        name: "True Damage Dealt",
        data: createRow("trueDamageDealt"),
      },
      {
        name: "Largest Critical Strike",
        data: createRow("largestCriticalStrike"),
      },
      {
        name: "Total Damage To Turrets",
        data: createRow("damageDealtToTurrets"),
      },
      {
        name: "Total Damage To Objectives",
        data: createRow("damageDealtToObjectives"),
      },
    ],
  };
  const TABLE_SECTION_DMG_TAKEN = {
    title: "Damage Taken And Healed",
    rows: [
      {
        name: "Damage Healed",
        data: createRow("totalHeal"),
      },
      {
        name: "Damage Taken",
        data: createRow("totalDamageTaken"),
      },
      {
        name: "Physical Damage Taken",
        data: createRow("physicalDamageTaken"),
      },
      {
        name: "Magic Damage Taken",
        data: createRow("magicDamageTaken"),
      },
      {
        name: "True Damage Taken",
        data: createRow("trueDamageTaken"),
      },
      {
        name: "Self Mitigated Damage",
        data: createRow("damageSelfMitigated"),
      },
    ],
  };
  const TABLE_SECTION_VISION = {
    title: "Vision",
    rows: [
      {
        name: "Vision Score",
        data: createRow("visionScore"),
      },
      {
        name: "Wards Placed",
        data: createRow("wardsPlaced"),
      },
      {
        name: "Wards Destroyed",
        data: createRow("wardsKilled"),
      },
      {
        name: "Control Wards Purchased",
        data: createRow("visionWardsBoughtInGame"),
      },
    ],
  };
  const TABLE_SECTION_INCOME = {
    title: "Income",
    rows: [
      {
        name: "Gold Earned",
        data: createRow("goldEarned"),
      },
      {
        name: "Gold Spent",
        data: createRow("goldSpent"),
      },
      {
        name: "Minions Killed",
        data: createRow("totalMinionsKilled"),
      },
      {
        name: "Neutral Minions Killed",
        data: createRow("neutralMinionsKilled"),
      },
      {
        name: "Neutral Minions Killed in Team Jungle",
        data: match.participants.map(() => 0),
      },
      {
        name: "Neutral Minions Killed in Enemy Jungle",
        data: match.participants.map(() => 0),
      },
    ],
  };
  const TABLE_SECTION_MISCELLANEOUS = {
    title: "Miscellaneous",
    rows: [
      {
        name: "Towers Destroyed",
        data: createRow("turretKills"),
      },
      {
        name: "Inhibitors Destroyed",
        data: createRow("inhibitorKills"),
      },
    ],
  };

  const TABLE_SECTIONS = [
    TABLE_SECTION_COMBAT,
    TABLE_SECTION_DMG_DEALT,
    TABLE_SECTION_DMG_TAKEN,
    TABLE_SECTION_VISION,
    TABLE_SECTION_INCOME,
    TABLE_SECTION_MISCELLANEOUS,
  ];

  function createRow(key) {
    return match.participants.map((participant) =>
      participant[key].toLocaleString()
    );
  }

  return (
    <div className="stats-table-center">
      <div className="stats-table-container">
        <table className="stats-table">
          <tbody>
            <tr>
              <th />
              {match.participants.map((participant, index) => (
                <th key={index}>
                  <ChampSprite participant={participant} />
                </th>
              ))}
            </tr>
          </tbody>
          {TABLE_SECTIONS.map(({ title, rows }, index) => (
            <tbody key={index} className="table-section">
              <tr className="table-section-title">
                <th colSpan={20} className="table-row-title">
                  {title}
                </th>
              </tr>
              {rows.map(({ name, data }, index) => (
                <tr key={index}>
                  <td className="table-row-title">{name}</td>
                  {data.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
