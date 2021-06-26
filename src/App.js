import ContextLoader from "./hook/index";
import { SummonerPage } from "./components/page-components/SummonerPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ContextLoader>
        <Router>
          <SummonerPage />
        </Router>
      </ContextLoader>
    </div>
  );
}

export default App;
