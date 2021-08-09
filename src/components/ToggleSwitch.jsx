import React from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch(props) {
  const { event, isChecked } = props;

  return (
    <label className="switch">
      <input type="checkbox" onClick={() => event()} checked={isChecked} />
      <span className="slider round" />
    </label>
  );
}
