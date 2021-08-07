import React, { useContext, useEffect, useState } from "react";
import { DDragonVersionContext } from "../../hook";
import getAvatarIcon from "../../util/getAvatarIcon";
import getChampionSplash from "../../util/getChampionSplash";
import "./SummonerInfo.css";

export default function SummonerInfo(props) {
  const { data, startMatchIndex, matches, numMatchesToLoad } = props;
  const [champBGI, setChampBGI] = useState();
  const dDragon = useContext(DDragonVersionContext);

  useEffect(() => {
    if (
      !data ||
      !(startMatchIndex === 0) ||
      !(matches.length === numMatchesToLoad)
    ) {
      return;
    }
    let champs = new Map();
    matches.forEach((match) => {
      const champ = match.info.participants.find(
        ({ puuid }) => puuid === data.puuid
      ).championId;
      if (!champs.has(champ)) {
        champs.set(champ, 1);
      } else {
        champs.set(champ, champs.get(champ) + 1);
      }
    });
    console.log(champs);
    const id = Array.from(champs.entries()).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
    setChampBGI(id);
  }, [startMatchIndex, matches, numMatchesToLoad, data]);

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
    <div
      className="summoner-info"
      style={{
        backgroundImage: `url(${getChampionSplash(champBGI)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%",
      }}
    >
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
