import React, { useContext, useEffect } from "react";
import { ChampContext } from "../../hook/ChampContextHandler";
import { ChampionDataContext } from "../../hook";
import ChampAbility from "./ChampAbility";
import "./SkillOrder.css";

export default function SkillOrder(props) {
  const { player, participantId, timeline } = props;
  const champData = useContext(ChampionDataContext);
  const { champMap, loadChamp } = useContext(ChampContext);
  console.log(timeline);

  const { id } = Object.values(champData.data).find(
    (champ) => champ.key === player.championId.toString()
  );

  useEffect(() => {
    loadChamp(id);
  }, [id]);

  let playerEvents;

  function loadSkillOrder() {
    if (typeof timeline !== "undefined") {
      playerEvents =
        timeline.info.frames.flatMap((frame) =>
          frame.events.flatMap((event) =>
            event.participantId === participantId &&
            event.type === "SKILL_LEVEL_UP"
              ? event.skillSlot
              : []
          )
        ) ?? [];
      console.log(playerEvents);
    }
  }

  useEffect(() => {
    loadSkillOrder();
  }, []);

  const champ = champMap.get(id);
  console.log(champ);

  if (!champ) {
    return null;
  }
  return (
    <div className="skill-order-container">
      <p className="data-header">Skill Order</p>
      <div className="skill-order">
        {champ.spells.map((spell) => (
          <ChampAbility key={spell.name} ability={spell} />
        ))}
      </div>
    </div>
  );
}
