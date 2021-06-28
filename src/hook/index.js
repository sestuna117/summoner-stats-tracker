import React, { useEffect, useState } from "react";
import {
  getRuneShards,
  getItemData,
  getSpellData,
  getRuneData,
  getAllChampData,
  getDDragonVersion,
} from "../api/services/request.services";

export const DDragonVersionContext = React.createContext({});
export const ChampionDataContext = React.createContext({});
export const RuneDataContext = React.createContext({});
export const SumsDataContext = React.createContext({});
export const ItemDataContext = React.createContext({});
export const RuneShardsDataContext = React.createContext({});

export default function ContextLoader({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dDragon, setDDragon] = useState();
  const [champData, setChampData] = useState();
  const [runeData, setRuneData] = useState();
  const [spellData, setSpellData] = useState();
  const [itemData, setItemData] = useState();
  const [shardData, setShardData] = useState();

  const loadDragonData = async () => {
    try {
      const result = await getDDragonVersion();
      console.log(result);
      setDDragon(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  const loadChampData = async (dDragon) => {
    try {
      const result = await getAllChampData(dDragon);
      console.log(result);
      setChampData(result);
    } catch (e) {
      console.error(e);
    }
  };

  const loadRuneData = async (dDragon) => {
    try {
      const result = await getRuneData(dDragon);
      console.log(result);
      setRuneData(result);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSpellData = async (dDragon) => {
    try {
      const result = await getSpellData(dDragon);
      console.log(result);
      setSpellData(result);
    } catch (e) {
      console.error(e);
    }
  };

  const loadItemData = async (dDragon) => {
    try {
      const result = await getItemData(dDragon);
      console.log(result);
      setItemData(result);
    } catch (e) {
      console.error(e);
    }
  };

  const loadShardData = async () => {
    try {
      const result = await getRuneShards();
      console.log(result);
      setShardData(result);
    } catch (e) {
      console.error(e);
    }
  };

  const loadData = async () => {
    setIsLoaded(false);

    await loadShardData();
    const dragonData = await loadDragonData();
    await Promise.all([
      await loadChampData(dragonData),
      await loadRuneData(dragonData),
      await loadSpellData(dragonData),
      await loadItemData(dragonData),
    ]);

    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DDragonVersionContext.Provider value={dDragon}>
      <ChampionDataContext.Provider value={champData}>
        <RuneDataContext.Provider value={runeData}>
          <SumsDataContext.Provider value={spellData}>
            <ItemDataContext.Provider value={itemData}>
              <RuneShardsDataContext.Provider value={shardData}>
                {isLoaded ? children : "Loading..."}
              </RuneShardsDataContext.Provider>
            </ItemDataContext.Provider>
          </SumsDataContext.Provider>
        </RuneDataContext.Provider>
      </ChampionDataContext.Provider>
    </DDragonVersionContext.Provider>
  );
}
