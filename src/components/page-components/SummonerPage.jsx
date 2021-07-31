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

export function SummonerPage() {
  const dDragon = useContext(DDragonVersionContext);

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
    setQueryParams(name, region); // Updates page URL
  };

  const getProfile = async () => {
    setStartMatchIndex(0);
    setMatches([]);
    setMatchViews([]);
    try {
      const result = await getSumByName(name, region);
      console.log(result);
      setData(result);
      await loadMatches();
    } catch (e) {
      console.error(e);
    }
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
  }

  useEffect(() => {
    if (!startMatchIndex || !(matches.length % 10 === 0)) {
      return;
    }
    loadMatches();
  }, [startMatchIndex]);

  return (
    <div>
      <div className="top">
        <NavBar onSearch={onSearch} />
      </div>
      {data && matches && (
        <div className="main-body">
          <SummonerInfo data={data} dDragon={dDragon} />
          <div className="content">
            <RanksSection data={data} region={region} />
            <div className="match-section">
              <ul className="match-list">{matchViews}</ul>
              <button
                onClick={() => {
                  setStartMatchIndex((prev) => prev + 10);
                  setMatches([]);
                }}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      )}
      <PageFooter />
    </div>
  );
}
