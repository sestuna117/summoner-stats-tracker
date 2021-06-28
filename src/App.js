import ContextLoader from "./hook/index";
import ChampContextHandler from "./hook/ChampContextHandler";
import { SummonerPage } from "./components/page-components/SummonerPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ContextLoader>
        <Router>
          <ChampContextHandler>
            <SummonerPage />
          </ChampContextHandler>
        </Router>
      </ContextLoader>
    </div>
  );
}

export default App;
