import React, {useEffect, useReducer} from 'react';
import {
    getCardsRequest,
    getDrawCardsSuccess,
    getDrawCardsFailure,
    getDrawCardsRequest,
    getCardsSuccess,
    getCardsFailure
} from "./gamePlayActions";
import {initialState, gamePLayReducer} from "./gamePlayReducer";
import Spinner from "../../commonComponents/Spinner";
import GamePLay from "./components/GamePlay";
import Modal from 'react-modal';
import {Link} from "react-router-dom";

function GamePlayPage({
  history,
  match,
}) {
    const [state, dispatch] = useReducer(gamePLayReducer, initialState);
    const numOfPlayers = match.params.numOfPlayers > 4 ? 4 : Number(match.params.numOfPlayers);
    const numOfCardsToDraw = numOfPlayers * 10;

    // fetch a full deck of cards on init
    useEffect(() => {
        dispatch(getCardsRequest());
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => response.json())
            .then(response => dispatch(getCardsSuccess(response)))
            .catch(error => dispatch(getCardsFailure(error)))
    }, []);

    // get cards from the deck
    useEffect(() => {
        if (state.cards) {
            dispatch(getDrawCardsRequest());
            fetch(`https://deckofcardsapi.com/api/deck/${state.cards.deck_id}/draw/?count=${numOfCardsToDraw}`)
                .then(response => response.json())
                .then(response => dispatch(getDrawCardsSuccess(response)))
                .catch(error => dispatch(getDrawCardsFailure(error)))
        }
    }, [
        state.cards,
        numOfPlayers,
        numOfCardsToDraw
    ]);

    /**
     * Prevents refresh or closing of a page
     *
     * @param event
     */
    function preventUnload(event) {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
    }

    // handle page refresh or closing tab
    useEffect(() => {
        window.addEventListener('beforeunload' ,(event) => {
            preventUnload(event)
        });

        return () => {
            window.removeEventListener('beforeunload', (event => preventUnload(event)))
        }
    }, []);

    if (state.isGetCardsFailed || state.isGetDrawCardsFailed) {
        return (
            <Modal
                isOpen={true}
            >
                <div data-testid="errorMessage" className="CenterWrapperColumn">
                    Something went wrong, please try again.
                    <Link to="/">Return to Home Page</Link>
                </div>
            </Modal>
        );
    }

    if (!state.drawCards) return (
        <div data-testid='Loader'><Spinner /></div>
    );

    return (
        <GamePLay
            drawCards={state.drawCards}
            numOfPlayers={numOfPlayers}
            dispatch={dispatch}
            winnersByRound={state.winnersByRound}
            numOfRounds={state.numOfRounds}
            selectedCards={state.selectedCards}
            playersDecks={state.playersDecks}
            history={history}
        />
    );

}

export default GamePlayPage;
