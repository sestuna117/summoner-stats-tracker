import React, { useState } from "react";
import "./MatchAnalytics.css";
import TeamAnalytics from "./TeamAnalytics";
import cx from "classnames";

export default function MatchAnalytics(props) {
  const { participants, match } = props;
  const [activeTab, setActiveTab] = useState("team-analytics");

  const onRadioChange = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div>
      <form className="tabs sub-tabs data-header">
        <input
          type="radio"
          id="team-analytics"
          name="tab"
          checked={activeTab === "team-analytics"}
          onChange={onRadioChange}
        />
        <label htmlFor="team-analytics">Team Analytics</label>

        <input
          type="radio"
          id="gold-advantage"
          name="tab"
          checked={activeTab === "gold-advantage"}
          onChange={onRadioChange}
        />
        <label htmlFor="gold-advantage">Gold Advantage</label>

        <input
          type="radio"
          id="kill-map"
          name="tab"
          checked={activeTab === "kill-map"}
          onChange={onRadioChange}
        />
        <label htmlFor="kill-map">Kill Map</label>
      </form>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "team-analytics",
        })}
      >
        <TeamAnalytics participants={participants} match={match} />
      </div>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "gold-advantage",
        })}
      ></div>
      <div
        className={cx("tab-content", {
          "active-sub-tab": activeTab === "kill-map",
        })}
      ></div>
    </div>
  );
}
