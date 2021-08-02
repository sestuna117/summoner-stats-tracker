import React, { useContext, useEffect, useState } from "react";
import {
  getMatchInfo,
  getMatches,
  getSumByName,
} from "../../api/services/request.services";
import MatchView from "../match-components/MatchView";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import useQuery from "../../util/useQuery";
import NavBar from "./NavBar";
import SummonerInfo from "./SummonerInfo";
import "./SummonerPage.css";
import { DDragonVersionContext } from "../../hook";
import RanksSection from "./RanksSection";
import PageFooter from "./PageFooter";
import LoadingSpinner from "./LoadingSpinner";
import WinRatesSection from "./WinRatesSection";

export function SummonerPage() {
  const dDragon = useContext(DDragonVersionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  const history = useHistory(); // Search history (page URL etc.)
  const query = useQuery(); // Query parameters (the bit after ? in URL)

  // Pull data from query parameters and use these to load data
  const name = query.get("name") ?? "";
  const region = query.get("region") ?? "na1";

  const [data, setData] = useState();
  const [matches, setMatches] = useState([]);
  const [matchViews, setMatchViews] = useState([]);
  const [startMatchIndex, setStartMatchIndex] = useState(0);

  // On page load, if name specified in query parameters, start loading profile
  useEffect(() => {
    if (name.length > 0) {
      getProfile();
    }
  }, [name, region]);

  // Updates query parameters in URL
  const setQueryParams = (name, region) => {
    // TODO https://reactrouter.com/web/example/basic
    const queryString = qs.stringify({ name, region }); // Turns name and region in to '?name=NAME&region=REGION'
    history.push({ search: queryString }); // Update page URL with new query parameters
  };

  const onSearch = (name, region) => {
    setStartMatchIndex(0);
    setQueryParams(name, region); // Updates page URL
  };

  const getProfile = async () => {
    setIsLoading(true);

    setMatches([]);
    await setMatchViews([]);

    try {
      const result = await getSumByName(name, region);
      console.log(result);
      setData(result);
      await loadMatches();
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  useEffect(async () => {
    if (!data || !(matches.length % 10 === 0)) {
      return;
    }
    matches
      .sort((a, b) => b.info.gameCreation - a.info.gameCreation)
      .forEach((match) => {
        setMatchViews((prev) => [
          ...prev,
          <MatchView
            key={match.metadata.matchId}
            match={match}
            puuid={data.puuid}
            dDragon={dDragon}
            region={region}
          />,
        ]);
      });
  }, [data, matches]);

  async function loadMatches() {
    setIsLoadingMatches(true);

    console.log(startMatchIndex);
    let matchIds;
    try {
      const matches = await getMatches(name, region, startMatchIndex);
      console.log(matches);
      matchIds = matches;
    } catch (e) {
      console.error(e);
      return;
    }

    const promises = matchIds.map(async (id) => {
      try {
        const match = await getMatchInfo(id, region);
        console.log(match);
        setMatches((prev) => [...prev, match]);
      } catch (e) {
        console.error(e);
      }
    });

    await Promise.all(promises);

    setIsLoadingMatches(false);
  }

  useEffect(() => {
    if (!startMatchIndex || !(matches.length % 10 === 0)) {
      return;
    }
    loadMatches();
  }, [startMatchIndex]);

  return (
    <div className="page">
      <div className="top">
        <NavBar onSearch={onSearch} />
      </div>
      {data && matches && (
        <div className="body">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="main-body">
              <SummonerInfo data={data} dDragon={dDragon} />
              <div className="content">
                <div className="side-content">
                  <RanksSection data={data} region={region} />
                  <WinRatesSection matches={matches} player={data} />
                </div>
                <div className="match-section">
                  <ul className="match-list">{matchViews}</ul>
                  {isLoadingMatches ? (
                    <LoadingSpinner isMatch={true} />
                  ) : (
                    <button
                      className="show-more-button"
                      onClick={() => {
                        setStartMatchIndex((prev) => prev + 10);
                        setMatches([]);
                      }}
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <PageFooter />
    </div>
  );
}
