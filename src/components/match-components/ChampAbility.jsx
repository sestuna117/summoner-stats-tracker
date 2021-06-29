import React, { useContext } from "react";
import getChampAbilityIcon from "../../util/getChampAbilityIcon";
import { DDragonVersionContext } from "../../hook";
import "./ChampAbility.css";

export default function ChampAbility(props) {
  const { ability } = props;
  const dDragon = useContext(DDragonVersionContext);

  return (
    <img
      className="champ-ability"
      src={getChampAbilityIcon(ability.id, dDragon)}
      alt={ability.name}
    />
  );
}
