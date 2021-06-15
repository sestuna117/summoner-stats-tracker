import ContextLoader from './hook/index'
import {SummonerPage} from "./components/SummonerPage";

function App() {
    return (
        <div className="App">
            <ContextLoader>
                <SummonerPage />
            </ContextLoader>
        </div>
    );
}

export default App;
