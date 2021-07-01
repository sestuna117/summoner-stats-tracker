import React, { useContext, useEffect, useState } from "react";
import { ChampContext } from "../../../hook/ChampContextHandler";
import { ChampionDataContext } from "../../../hook";
import ChampAbility from "./ChampAbility";
import "./SkillOrder.css";
import AbilityRow from "./AbilityRow";

export default function SkillOrder(props) {
  const { player, participantId, timeline } = props;
  const champData = useContext(ChampionDataContext);
  const { champMap, loadChamp } = useContext(ChampContext);
  const [playerEvent, setPlayerEvent] = useState([]);
  const [skillOrder, setSkillOrder] = useState([]);

  const { id } = Object.values(champData.data).find(
    (champ) => champ.key === player.championId.toString()
  );

  useEffect(() => {
    loadChamp(id);
  }, [id]);

  function loadSkillOrder() {
    if (timeline === undefined || participantId === undefined) {
      return;
    }

    const playerEvents = timeline.info.frames
      .flatMap((frame) =>
        frame.events.filter(
          (event) =>
            event.type === "SKILL_LEVEL_UP" &&
            event.participantId === participantId
        )
      )
      .map((event) => event.skillSlot);
    setPlayerEvent(playerEvents);
    console.log(playerEvents);
    console.log(playerEvents.length);
  }

  useEffect(() => {
    loadSkillOrder();
  }, [timeline, participantId]);

  const champ = champMap.get(id);

  console.log(champ);

  //TODO
  useEffect(() => {
    if (champ == null || playerEvent.length === 0) {
      return;
    }
    const skillLevelOrder = champ.spells.map(() => []);
    playerEvent.forEach((slot, index) => skillLevelOrder[slot - 1].push(index));
    console.log(skillLevelOrder);
    setSkillOrder(skillLevelOrder);
  }, [champ, playerEvent]);

  if (!champ) {
    return null;
  }
  return (
    <div className="skill-order-container">
      <p className="data-header">Skill Order</p>
      <div className="skill-order">
        {champ.spells.map((spell, index) => (
          <AbilityRow
            key={index}
            spell={spell}
            slot={index}
            skillOrder={skillOrder[index]}
            maxLevel={playerEvent.length}
          />
        ))}
      </div>
    </div>
  );
}
