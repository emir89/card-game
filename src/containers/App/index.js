import React, {Suspense, lazy} from 'react';
import './App.css';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Spinner from "../../commonComponents/Spinner";
import HomePage from '../HomePage';
import PageNotFound from "../../commonComponents/PageNotFound";

const GamePlayPage = lazy(() => import('../GamePlayPage'));

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Suspense fallback={<Spinner />}>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/game-play/:numOfPlayers" component={GamePlayPage} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
