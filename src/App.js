import { SummonerPage } from './components/SummonerPage';
import {ChampionDataProvider} from "./hook/ChampionDataContext";

function App() {
  return (
      <ChampionDataProvider>
          <div className="App">
              <SummonerPage />
          </div>
      </ChampionDataProvider>
  );
}

export default App;
