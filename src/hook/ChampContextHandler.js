import React, { useContext, useState } from "react";
import { getSingleChampData } from "../api/services/request.services";
import { DDragonVersionContext } from "./index";

const ChampContext = React.createContext({
  champMap: new Map(),
  loadChamp: () => {},
});

export default function ChampContextHandler({ children }) {
  const dDragon = useContext(DDragonVersionContext);
  const [champs, setChamps] = useState(new Map());

  const loadChamp = async (champId) => {
    try {
      const champ = await getSingleChampData(dDragon, champId);

      setChamps((prev) => {
        const champs = new Map(prev);
        champs.set(champId, champ);
        return champs;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChampContext.Provider value={{ champMap: champs, loadChamp }}>
      {children}
    </ChampContext.Provider>
  );
}
