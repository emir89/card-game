import React, {Suspense, lazy} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Spinner from "../../commonComponents/Spinner/Spinner";
import HomePage from '../HomePage/Homepage';
import PageNotFound from "../../commonComponents/PageNotFound/NotFound";

const GamePlayPage = React.lazy(() => import('../GamePlayPage/GamePlayPage'));

function App() {
    return (
        <Router>
            <Suspense fallback={<Spinner style={{}} color="#3498db" />}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game-play/:numOfPlayers" element={<GamePlayPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
