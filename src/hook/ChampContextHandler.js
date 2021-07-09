import React, { useState } from "react";
import { getSingleChampData } from "../api/services/request.services";

export const ChampContext = React.createContext({
  champMap: new Map(),
  loadChamp: () => {},
});

export default function ChampContextHandler({ children }) {
  const [champs, setChamps] = useState(new Map());

  const loadChamp = async (champId) => {
    if (champs.has(champId)) {
      return;
    }
    setChamps((prev) => {
      const champs = new Map(prev);
      champs.set(champId, null);
      return champs;
    });
    try {
      const champ = await getSingleChampData(champId);
      const obj = Object.values(champ.data)[0];
      setChamps((prev) => {
        const champs = new Map(prev);
        champs.set(champId, obj);
        return champs;
      });
    } catch (error) {
      setChamps((prev) => {
        const champs = new Map(prev);
        champs.delete(champId);
        return champs;
      });
      console.error(error);
    }
  };

  return (
    <ChampContext.Provider value={{ champMap: champs, loadChamp }}>
      {children}
    </ChampContext.Provider>
  );
}
