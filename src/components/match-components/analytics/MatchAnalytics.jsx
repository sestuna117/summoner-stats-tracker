import React from "react";
import "./MatchAnalytics.css";
import TeamAnalytics from "./TeamAnalytics";

export default function MatchAnalytics(props) {
  const { participants, TEAM } = props;

  return (
    <div>
      <form className="tabs sub-tabs data-header">
        <input type="radio" id="match-analytics" name="tab" checked="checked" />
        <label htmlFor="match-analytics">Team Analytics</label>
        <div className="tab-content">
          <TeamAnalytics participants={participants} TEAM={{ TEAM }} />
        </div>

        <input type="radio" id="gold-advantages" name="tab" />
        <label htmlFor="gold-advantages">Gold Advantage</label>
        <div className="tab-content"></div>

        <input type="radio" id="kill-map" name="tab" />
        <label htmlFor="kill-map">Kill Map</label>
        <div className="tab-content"></div>
      </form>
    </div>
  );
}
