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
import RankedInfo from "./RankedInfo";
import "./SummonerPage.css";
import { DDragonVersionContext } from "../../hook";

export function SummonerPage(props) {
  const dDragon = useContext(DDragonVersionContext);
  console.log(dDragon);

  const history = useHistory(); // Search history (page URL etc.)
  const query = useQuery(); // Query parameters (the bit after ? in URL)

  // Pull data from query parameters and use these to load data
  const name = query.get("name") ?? "";
  const region = query.get("region") ?? "na1";

  const [data, setData] = useState();
  const [matches, setMatches] = useState([]);

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
    setMatches([]);
    let matchIds = [];
    try {
      const result = await getSumByName(name, region);
      console.log(result);
      setData(result);
      const matches = await getMatches(name, region);
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
  };

  return (
    <div>
      <div className="top">
        <NavBar onSearch={onSearch} />
      </div>
      {data && matches && (
        <div className="main-body">
          <SummonerInfo data={data} dDragon={dDragon} />
          <div className="content">
            <RankedInfo data={data} region={region} />
            <ul className="match-list">
              {matches
                ?.sort((a, b) => b.info.gameCreation - a.info.gameCreation)
                .map((match) => (
                  <MatchView
                    key={match.metadata.matchId}
                    match={match}
                    puuid={data.puuid}
                    dDragon={dDragon}
                    region={region}
                  />
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
