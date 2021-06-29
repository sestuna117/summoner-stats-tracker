import React, { useContext, useEffect } from "react";
import { ChampContext } from "../../hook/ChampContextHandler";
import { ChampionDataContext } from "../../hook";
import ChampAbility from "./ChampAbility";
import "./SkillOrder.css";

export default function SkillOrder(props) {
  const { player } = props;
  const champData = useContext(ChampionDataContext);
  const { champMap, loadChamp } = useContext(ChampContext);

  const { id } = Object.values(champData.data).find(
    (champ) => champ.key === player.championId.toString()
  );

  useEffect(() => {
    loadChamp(id);
  }, [id]);

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
          <ChampAbility ability={spell} />
        ))}
      </div>
    </div>
  );
}
