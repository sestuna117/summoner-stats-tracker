import React, { useContext } from "react";
import { DDragonVersionContext } from "../../hook";
import getAvatarIcon from "../../util/getAvatarIcon";
import "./SummonerInfo.css";

export default function SummonerInfo(props) {
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
