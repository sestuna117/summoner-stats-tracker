import React, { useEffect, useState } from "react";
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
    rows: [],
  };
  const TABLE_SECTION_VISION = {
    title: "Vision",
    rows: [],
  };
  const TABLE_SECTION_INCOME = {
    title: "Income",
    rows: [],
  };
  const TABLE_SECTION_MISCELLANEOUS = {
    title: "Miscellaneous",
    rows: [],
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
    return match.participants.map((participant) => participant[key]);
  }

  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th />
            {match.participants.map((participant, index) => (
              <th key={index}>
                <ChampSprite participant={participant} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Combat</th>
          </tr>
          <tr>
            <th>Damage Dealt</th>
          </tr>
          <tr>
            <th>Damage Taken and Healed</th>
          </tr>
          <tr>
            <th>Vision</th>
          </tr>
          <tr>
            <th>Income</th>
          </tr>
          <tr>
            <th>Miscellaneous</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
