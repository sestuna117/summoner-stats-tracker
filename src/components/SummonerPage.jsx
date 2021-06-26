import React, { useContext, useEffect, useState } from "react";
import {
  getRankedInfo,
  getMatchInfo,
  getMatches,
  getSumByName,
} from "../api/services/request.services";
import MatchView from "./MatchView";
import "./SummonerPage.css";
import getAvatarIcon from "../util/getAvatarIcon";
import getRankIcon from "../util/getRankIcon";
import { DDragonVersionContext } from "../hook";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import useQuery from "../util/useQuery";

function NavBar(props) {
  const { name, region, onSearch, changeName, changeRegion } = props;
  return (
    <nav className="navbar">
      <a className="navbar-logo" href={"#"}>
        Home
      </a>
      <div className="navbar-right">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
            return false;
          }}
        >
          <input
            value={name}
            type={"text"}
            placeholder={"Input Summoner Name..."}
            onChange={(e) => changeName(e.target.value)}
          />
          <button type={"submit"}>Search</button>
          <select value={region} onChange={(e) => changeRegion(e.target.value)}>
            <option value={"br1"}>BR</option>
            <option value={"eun1"}>EUNE</option>
            <option value={"euw1"}>EUW</option>
            <option value={"jp1"}>JP</option>
            <option value={"kr1"}>KR</option>
            <option value={"la1"}>LAN</option>
            <option value={"la2"}>LAS</option>
            <option value={"na1"}>NA</option>
            <option value={"oc1"}>OCE</option>
            <option value={"ru"}>RU</option>
            <option value={"tr1"}>TR</option>
          </select>
        </form>
      </div>
    </nav>
  );
}

function RankedInfo(props) {
  const { data } = props;
  const [rankData, setRankData] = useState();
  const ranks = getRankIcon;
  const [soloInfo, setSoloInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadRankedInfo() {
    try {
      const result = await getRankedInfo(data.id);
      setRankData(result);
      console.log(result);
      if (result.length !== 0) {
        setSoloInfo(
          result?.find((queue) => queue?.queueType === "RANKED_SOLO_5x5")
        );
      } else {
        setSoloInfo(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsLoaded(false);

    loadRankedInfo();

    setIsLoaded(true);
  }, [data?.id]);

  const getTier = () => {
    switch (soloInfo?.rank) {
      case "I":
        return ranks.get(soloInfo?.tier)?.tiers.I;
      case "II":
        return ranks.get(soloInfo?.tier)?.tiers.II;
      case "III":
        return ranks.get(soloInfo?.tier)?.tiers.III;
      default:
        return ranks.get(soloInfo?.tier)?.tiers.IV;
    }
  };

  if (soloInfo === undefined) {
    return (
      <div className="ranked-info">
        <div className="rank-icon-container">
          {isLoaded ? (
            <img
              className="rank-icon"
              src={ranks.get("UNRANKED")?.tiers.I}
              alt={"Unranked"}
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div className="ranked-text">
          <p>Ranked Solo</p>
          <p>Unranked</p>
        </div>
      </div>
    );
  } else {
    return isLoaded ? (
      <div className="ranked-info">
        <div className="rank-icon-container">
          <img
            className="rank-icon"
            src={getTier()}
            alt={`${ranks.get(soloInfo?.tier)?.name}_${soloInfo?.rank}`}
          />
        </div>
        <div className="ranked-text">
          <p>Ranked Solo</p>
          <p>{`Winrate: ${parseInt(
            (soloInfo?.wins / (soloInfo?.wins + soloInfo?.losses)) * 100
          )}%`}</p>
          <p>{`${ranks.get(soloInfo?.tier)?.name} ${soloInfo?.rank}`}</p>
          <p>{`${soloInfo?.leaguePoints} LP`}</p>
          <p>{`${soloInfo?.wins}W - ${soloInfo?.losses}L`}</p>
        </div>
      </div>
    ) : null;
  }
}

function SummonerInfo(props) {
  const { data } = props;
  const dDragon = useContext(DDragonVersionContext);

  /* for later mastery addition */
  /*const [champMastery, setChampMastery] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadChampMasteries() {
        try {
            const result = await getChampMastery(data.id);
            setChampMastery(result);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setIsLoaded(false);

        loadChampMasteries();

        setIsLoaded(true);
    }, [data?.id]);*/

  return (
    <div className="summoner-info">
      <img
        className="profile-icon"
        src={getAvatarIcon(data?.profileIconId, dDragon)}
        alt={`${data?.profileIconId}`}
      />
      <div className="summoner-text">
        <h2>{data?.name}</h2>
        <p>Level. {data?.summonerLevel ?? "data not loaded"}</p>
      </div>
    </div>
  );
}

export function SummonerPage(props) {
  const { dDragon } = props;

  const history = useHistory(); // Search history (page URL etc.)
  const query = useQuery(); // Query parameters (the bit after ? in URL)

  // Pull data from query parameters and use these to load data
  const name = query.get("name") ?? "";
  const region = query.get("region") ?? "na1";

  // Search box
  const [tempName, setName] = useState(name);
  const [tempRegion, setRegion] = useState(region);

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

  const onSearch = () => {
    setQueryParams(tempName, tempRegion); // Updates page URL
  };

  const getProfile = async () => {
    setMatches([]);
    let matchIds = [];
    try {
      const result = await getSumByName(name, region);
      console.log(result);
      setData(result);
      const matches = await getMatches(result.puuid);
      console.log(matches);
      matchIds = matches;
    } catch (e) {
      console.error(e);
      return;
    }

    const promises = matchIds.map(async (id) => {
      try {
        const match = await getMatchInfo(id);
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
        <NavBar
          name={tempName}
          region={tempRegion}
          onSearch={onSearch}
          changeName={setName}
          changeRegion={setRegion}
        />
      </div>
      {data && matches && (
        <div className="main-body">
          <div className="content">
            <SummonerInfo data={data} dDragon={dDragon} />
            <RankedInfo data={data} />
            <div>
              <ul className="match-list">
                {matches
                  ?.sort((a, b) => b.info.gameCreation - a.info.gameCreation)
                  .map((match) => (
                    <MatchView
                      key={match.metadata.matchId}
                      match={match}
                      puuid={data.puuid}
                      dDragon={dDragon}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
