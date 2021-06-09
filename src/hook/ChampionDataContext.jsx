import React, {useEffect, useState} from "react";
import {getChampData} from '../api/services/request.services';

export const ChampionDataContext = React.createContext({});

export function ChampionDataProvider(props) {
    const [champData, setChampData] = useState({});

    async function loadChampData() {
        try {
            const result = await getChampData();
            console.log(result);
            setChampData(result);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        loadChampData();
    },[])

    return (
        <ChampionDataContext.Provider value={champData}>{props.children}</ChampionDataContext.Provider>
    );
}