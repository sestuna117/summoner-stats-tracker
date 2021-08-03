import React from "react";
import "./ProgressBar.css";

export default function ProgressBar(props) {
  const { progress, maxValue } = props;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${(progress / maxValue) * 100}%` }}
      />
    </div>
  );
}
