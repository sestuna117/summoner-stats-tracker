import React from "react";
import "./AbilityRowSlot.css";

export default function AbilityRowSlot(props) {
  const { value } = props;
  const isEmpty = value === "";

  return !isEmpty ? (
    <div className="ability-level-slot ability-slot-active">{value}</div>
  ) : (
    <div className="ability-level-slot" />
  );
}
