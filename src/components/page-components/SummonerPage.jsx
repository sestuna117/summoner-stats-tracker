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
import RanksSection from "./page-side-components/RanksSection";
import PageFooter from "./PageFooter";
import LoadingSpinner from "./LoadingSpinner";
import RecentChampionSection from "./page-side-components/RecentChampionSection";
import RecentlyPlayedWithSection from "./page-side-components/RecentlyPlayedWithSection";
import cx from "classnames";
import DefaultHomePage from "./DefaultHomePage";
import ErrorPage from "./ErrorPage";
import { IoAlertCircleOutline } from "react-icons/all";

export function SummonerPage() {
  const dDragon = useContext(DDragonVersionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [numMatchesToLoad, setNumMatchesToLoad] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [availableData, setAvailableData] = useState(true);
  const [theme, setTheme] = useState("light-mode");

  const history = useHistory(); // Search history (page URL etc.)
  const query = useQuery(); // Query parameters (the bit after ? in URL)

  // Pull data from query parameters and use these to load data
  const name = query.get("name");
  const region = query.get("region");

  const [data, setData] = useState();
  const [matches, setMatches] = useState([]);
  const [matchViews, setMatchViews] = useState([]);
  const [startMatchIndex, setStartMatchIndex] = useState(0);

  // On page load, if name specified in query parameters, start loading profile
  useEffect(() => {
    if (!name || !region) {
      return;
    }
    if (name.length > 0) {
      setStartMatchIndex(0);
      getProfile();
    }
  }, [name, region]);

  // Updates query parameters in URL
  const setQueryParams = (name, region) => {
    // TODO https://reactrouter.com/web/example/basic
    const queryString = qs.stringify({ name, region }); // Turns name and region in to '?name=NAME&region=REGION'
    history.push({ search: queryString }); // Update page URL with new query parameters
  };

  const changeTheme = () => {};

  const onSearch = (name, region) => {
    setQueryParams(name, region); // Updates page URL
  };

  const getProfile = async () => {
    setIsLoading(true);

    setMatches([]);
    await setMatchViews([]);

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

  async function loadMatchViews() {
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
  }

  useEffect(() => {
    if (
      numMatchesToLoad === 0 ||
      !data ||
      !(matches.length === numMatchesToLoad)
    ) {
      return;
    }
    loadMatchViews();
  }, [data, matches, numMatchesToLoad]);

  async function loadMatches() {
    setIsLoadingMatches(true);

    let matchIds;
    try {
      const matches = await getMatches(name, region, startMatchIndex);
      console.log(matches);
      matchIds = matches;
      setNumMatchesToLoad(matchIds.length);
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
    if (!startMatchIndex || !(matches.length === 0)) {
      return;
    }
    loadMatches();
  }, [startMatchIndex, matches]);

  return (
    <div id={"page-theme"} className={`page ${theme}`}>
      <div className="top">
        <NavBar onSearch={onSearch} />
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
                  startMatchIndex={startMatchIndex}
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
                    <RecentChampionSection
                      matches={matches}
                      player={data}
                      numOfMatches={numMatchesToLoad}
                    />
                    <RecentlyPlayedWithSection
                      matches={matches}
                      player={data.puuid}
                      numOfMatches={numMatchesToLoad}
                    />
                  </div>
                  {startMatchIndex === 0 && matches.length === 0 ? (
                    <div className="no-matches-msg">
                      <IoAlertCircleOutline className="alert-icon" />
                      <p>Could not retrieve recorded data on Summoner.</p>
                      <p>Please try again.</p>
                    </div>
                  ) : (
                    <div className="match-section">
                      <ul className="match-list">{matchViews}</ul>
                      {isLoadingMatches ? (
                        <LoadingSpinner isMatch={true} />
                      ) : startMatchIndex > 0 && matches.length === 0 ? (
                        <div className="no-matches-msg">
                          <IoAlertCircleOutline className="alert-icon" />
                          <p>No more recorded matches</p>
                        </div>
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
