import React, {useState, useEffect} from 'react';
import style from "./gamePLay.module.css";
import NotificationBar from "../../../../commonComponents/NotificationBar";
import SelectedCards from "../SelectedCards";
import DeckOfCards from "../DeckOfCards";
import GameWinner from "../GameWinner";
import {
    handleRoundWinner,
    handleNumberOfRounds,
    handleAddSelectedCards,
    handleRemoveSelectedCards,
    handleUpdatePlayersDecks
} from "../../gamePlayActions";
import {getCardValue} from "../../../../util/card";
import PropTypes from 'prop-types';


function GamePlay({
  drawCards,
  numOfPlayers,
  dispatch,
  winnersByRound,
  numOfRounds,
  playersDecks,
  selectedCards,
  history
}) {
    let [gameWinners, setGameWinners] = useState([]);
    const numOfWinnersByRound = winnersByRound?.length;

    /**
     * Handles click on a card
     *
     * @param player
     * @param selectedCard
     */
    function onClickCard(player, selectedCard) {
        dispatch(handleUpdatePlayersDecks(player, selectedCard));
        dispatch(handleAddSelectedCards(selectedCard, player));
    }

    /**
     * Sets round winner info
     */
    function setRoundWinnerInfo() {
        if (numOfWinnersByRound === 0)  return null;
        const roundWinner = winnersByRound[numOfWinnersByRound - 1];

        return (
            <p className={style.NotificationBarMessage}>
                {`Round winner: Player ${roundWinner.player} 
                        with score of ${roundWinner.byRound}`}
            </p>
        );
    }

    // Removes selected cards
    useEffect(() => {
        let timer;
        if (selectedCards?.length === numOfPlayers) {
            timer = setTimeout(() => dispatch(handleRemoveSelectedCards(), 1000));
        }

        return () => {
            clearTimeout(timer);
        }
    }, [selectedCards, numOfPlayers, dispatch]);

    // Sets players decks
    useEffect(() => {
        if (drawCards) {
            const clonedCards = drawCards.cards.slice(0);

            let chunkSize = 10;
            let playersCards = clonedCards.map((card, i) => {
                return i % chunkSize === 0 ? clonedCards.slice(i, i + chunkSize) : null;
            }).filter(card => card);
            dispatch(handleUpdatePlayersDecks(null, null, playersCards));
        }
    }, [
        drawCards,
        dispatch
    ]);

    // handles winner by round
    useEffect(() => {
        if (selectedCards?.length) {
            let timer;
            const numOfSelectedCards = selectedCards.length;
            if (numOfSelectedCards < numOfPlayers) {
                timer = setTimeout(
                    () => {
                        const player = numOfSelectedCards + 1;
                        const playerCards = playersDecks[player - 1].map(deck => {
                            return {
                                image: deck.image,
                                value: getCardValue(deck),
                                player
                            }
                        });
                        const selectedCard = playerCards[Math.floor(Math.random() * playerCards.length)];
                        onClickCard(player, selectedCard);
                    },
                    1000);
            } else if (numOfSelectedCards === numOfPlayers) {
                dispatch(handleRoundWinner());
                dispatch(handleNumberOfRounds());
            }

            return () => {
                clearTimeout(timer);
            }
        }
    }, [
        selectedCards,
        numOfPlayers,
        playersDecks,
        dispatch
    ]);

    // handles game winner
    useEffect(() => {
        if (numOfRounds === 10) {
            const sortedWinnersByRound = winnersByRound.slice().sort((b, a) => {
                return a.score > b.score ? 1 : -1;
            });

            const gameWinners = sortedWinnersByRound.reduce((acc, curr, i) => {
                if (i === 0) {
                    acc.push(curr);
                } else {
                    if (acc[0].score === curr.score) {
                        acc.push(curr)
                    }
                }

                return acc;

            }, []);

            setGameWinners(gameWinners);
        }
    }, [
        numOfRounds,
        winnersByRound
    ]);

    return (
        <div className={style.GameWrapper}>
            <NotificationBar
                isVisible={numOfRounds === 0 && selectedCards?.length === 0}
            >
                <p className={style.NotificationBarMessage}>
                    Welcome. To start the game, click on one of the cards from your deck. Good Luck!
                </p>
            </NotificationBar>
            {winnersByRound &&
            <NotificationBar
                data-testid="winnersByRound"
                isVisible={selectedCards?.length === numOfPlayers}
                timeout={2000}
            >{
                setRoundWinnerInfo()
            }
            </NotificationBar>}
            <SelectedCards selectedCards={selectedCards}/>
            <div className={style.DeckOfCardsWrapper}>
                {
                    playersDecks?.map((deck, i) => {
                        return (
                            <DeckOfCards
                                data-testid="deckOfCards"
                                cards={deck}
                                players={numOfPlayers}
                                handleClickCard={onClickCard}
                                winnersByRound={winnersByRound}
                                numOfSelectedCards={selectedCards.length}
                                playerOrder={i + 1}
                                currentPlayer={selectedCards.length + 1}
                                key={i}
                            />
                        );
                    })
                }
            </div>
            {gameWinners.length > 0 &&
            <GameWinner
                gameWinners={gameWinners}
                history={history}
            />
            }
        </div>
    );
}

GamePlay.propTypes = {
    drawCards: PropTypes.object.isRequired,
    numOfPlayers: PropTypes.number.isRequired,
    history: PropTypes.object
};

export default GamePlay;
