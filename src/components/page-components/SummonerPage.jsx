import React, { useContext, useEffect, useRef, useState } from "react";
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
import RanksSection from "./page-side-components/RanksSection";
import PageFooter from "./PageFooter";
import LoadingSpinner from "./LoadingSpinner";
import RecentChampionSection from "./page-side-components/RecentChampionSection";
import RecentlyPlayedWithSection from "./page-side-components/RecentlyPlayedWithSection";
import cx from "classnames";
import DefaultHomePage from "./DefaultHomePage";
import ErrorPage from "./ErrorPage";
import { IoAlertCircleOutline } from "react-icons/all";
import ErrorBoundary from "../ErrorBoundary";

export function SummonerPage() {
  const dDragon = useContext(DDragonVersionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [numMatchesToLoad, setNumMatchesToLoad] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [availableData, setAvailableData] = useState(true);
  const [theme, setTheme] = useState("light-mode");

  useEffect(() => {
    setTimeout(() => {
      const thematic = localStorage.getItem("theme");
      if (thematic) {
        setTheme(thematic);
      }
    }, 500);
  }, []);

  const changeTheme = () => {
    if (theme === "light-mode") {
      setTheme("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    } else {
      setTheme("light-mode");
      localStorage.setItem("theme", "light-mode");
    }
  };

  const history = useHistory(); // Search history (page URL etc.)
  const query = useQuery(); // Query parameters (the bit after ? in URL)

  // Pull data from query parameters and use these to load data
  const name = query.get("name");
  const region = query.get("region");

  const [data, setData] = useState();
  const [matches, setMatches] = useState([]);
  // On page load, if name specified in query parameters, start loading profile
  useEffect(() => {
    if (!name || !region) {
      return;
    }
    getProfile();
  }, [name, region]);

  // Updates query parameters in URL
  const setQueryParams = (name, region) => {
    // TODO https://reactrouter.com/web/example/basic
    const queryString = qs.stringify({ name, region }); // Turns name and region in to '?name=NAME&region=REGION'
    history.push({ search: queryString }); // Update page URL with new query parameters
  };

  const onSearch = (name, region) => {
    if (name.length > 0) {
      setQueryParams(name, region); // Updates page URL
    }
  };

  const getProfile = async () => {
    setIsLoading(true);

    setMatches([]);

    try {
      const result = await getSumByName(name, region);
      if (!result) {
        setAvailableData(false);
      } else {
        setData(result);
        await loadMatches();
        setAvailableData(true);
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  const startMatchIndexRef = useRef(0);

  async function loadMatches(startMatchIndex = 0) {
    startMatchIndexRef.current = startMatchIndex;
    setIsLoadingMatches(true);

    let matchIds;
    try {
      const matches = await getMatches(name, region, startMatchIndex);
      // console.log(matches);
      matchIds = matches;
      setNumMatchesToLoad(matchIds.length);
    } catch (e) {
      console.error(e);
      return;
    }

    let matches = [];

    const promises = matchIds.map(async (id) => {
      try {
        const match = await getMatchInfo(id, region);
        // console.log(match);
        matches.push(match);
      } catch (e) {
        console.error(e);
      }
    });

    await Promise.all(promises);

    setMatches((prev) => [...prev, ...matches]);
    setIsLoadingMatches(false);
  }

  return (
    <div id={"page-theme"} className={`page ${theme}`}>
      <div className="top">
        <NavBar onSearch={onSearch} changeTheme={changeTheme} theme={theme} />
      </div>
      {!name && !region ? (
        <DefaultHomePage onSearch={onSearch} />
      ) : !availableData ? (
        <ErrorPage />
      ) : (
        data &&
        matches && (
          <div className="body">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="main-body">
                <SummonerInfo
                  data={data}
                  matches={matches}
                  startMatchIndex={startMatchIndexRef.current}
                  numMatchesToLoad={numMatchesToLoad}
                />
                <div className="content-menu">
                  <div className="content-menu-tab-container">
                    <button
                      className={cx("content-menu-tab", {
                        "content-menu-tab-active": activeTab === "overview",
                      })}
                      type="button"
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                    {/*<button*/}
                    {/*  className={cx("content-menu-tab", {*/}
                    {/*    "content-menu-tab-active": activeTab === "champions",*/}
                    {/*  })}*/}
                    {/*  type="button"*/}
                    {/*  onClick={() => setActiveTab("champions")}*/}
                    {/*>*/}
                    {/*  Champions*/}
                    {/*</button>*/}
                  </div>
                </div>
                <div className="content">
                  <div className="side-content">
                    <RanksSection data={data} region={region} />
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
                  {startMatchIndexRef.current === 0 && matches.length === 0 ? (
                    <div className="no-matches-msg">
                      <IoAlertCircleOutline className="alert-icon" />
                      <p>Could not retrieve recorded data on Summoner.</p>
                      <p>Please try again.</p>
                    </div>
                  ) : (
                    <div className="match-section">
                      <ul className="match-list">
                        {(!isLoadingMatches || matches.length > 0) &&
                          matches
                            .sort(
                              (a, b) =>
                                b.info.gameCreation - a.info.gameCreation
                            )
                            .map((match) => (
                              <ErrorBoundary
                                key={match.metadata.matchId}
                                onError={() => (
                                  <MatchView
                                    match={match}
                                    puuid={data.puuid}
                                    dDragon={dDragon}
                                    region={region}
                                    hasError
                                  />
                                )}
                              >
                                <MatchView
                                  match={match}
                                  puuid={data.puuid}
                                  dDragon={dDragon}
                                  region={region}
                                />
                              </ErrorBoundary>
                            ))}
                      </ul>
                      {isLoadingMatches ? (
                        <LoadingSpinner isMatch={true} />
                      ) : startMatchIndexRef.current > 0 &&
                        matches.length === 0 ? (
                        <div className="no-matches-msg">
                          <IoAlertCircleOutline className="alert-icon" />
                          <p>No more recorded matches</p>
                        </div>
                      ) : (
                        <button
                          className="show-more-button"
                          onClick={() => {
                            loadMatches(startMatchIndexRef.current + 10);
                          }}
                        >
                          Show More
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      )}
      <PageFooter />
    </div>
  );
}
