import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import RecentChampionSection from "./RecentChampionSection";
import RecentlyPlayedWithSection from "./RecentlyPlayedWithSection";
import "./SideSections.css";

export default function RecentStatsSection(props) {
  const { matches, data, numMatchesToLoad } = props;

  return (
    <div className="recent-stats-section">
      <ErrorBoundary
        onError={() => (
          <RecentChampionSection
            matches={matches}
            player={data}
            numOfMatches={numMatchesToLoad}
            hasError
          />
        )}
      >
        <RecentChampionSection
          matches={matches}
          player={data}
          numOfMatches={numMatchesToLoad}
        />
      </ErrorBoundary>
      <RecentlyPlayedWithSection
        matches={matches}
        player={data.puuid}
        numOfMatches={numMatchesToLoad}
      />
    </div>
  );
}
