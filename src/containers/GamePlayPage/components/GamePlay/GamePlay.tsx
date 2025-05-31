import React, {useState, useEffect} from 'react';
import style from "./gamePLay.module.css";
import NotificationBar from "../../../../commonComponents/NotificationBar/NotificationBar";
import SelectedCards from "../SelectedCards/SelectedCards";
import DeckOfCards from "../DeckOfCards/DeckOfCards";
import GameWinner from "../GameWinner/GameWinner";
import {getCardValue} from "../../../../util/card";
import { Card, SelectedCard, WinnerByRound } from '../../types';

type GamePlayProps = {
  drawCards: Card[] | null;
  numOfPlayers: number;
};


const GamePlay = ({
  drawCards,
  numOfPlayers,
}: GamePlayProps) => {
    const [cards, setCards] = useState<Card[] | null>(null);
    const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
    const [winnersByRound, setWinnersByRound] = useState<WinnerByRound[]>([]);
    const [numOfRounds, setNumOfRounds] = useState<number>(0);
    const [playersDecks, setPlayersDecks] = useState<Card[][]>([]);
    const [gameWinners, setGameWinners] = useState<WinnerByRound[]>([]);

    const showGameStartNotification = numOfRounds === 0 && selectedCards?.length === 0;

    // Initialize cards from drawCards on first mount, or update if drawCards changes
    useEffect(() => {
        if (drawCards && !cards) {
            setCards(drawCards);
        }
    }, [drawCards]);

    // Helper: Add selected card
    const addSelectedCards = (player: number, selectedCard: Card) => {
        setSelectedCards(prev => ([
            ...prev,
            {
                image: selectedCard.image,
                value: getCardValue(selectedCard),
                player,
            }
        ]));
    };

    // Helper: Remove selected cards
    const removeSelectedCards = () => {
        setSelectedCards([]);
    };

    // Helper: Update players decks
    const handleUpdatePlayersDecks = (player?: number, selectedCard?: Card, playerDecksOverride?: Card[][]) => {
        if (!player) {
            setPlayersDecks(playerDecksOverride ?? []);
            return;
        }
        if (selectedCard) {
            setPlayersDecks(prev =>
                prev.map((deck, idx) =>
                    idx === player - 1 ? deck.filter(card => card.image !== selectedCard.image) : deck
                )
            );
        }
    };

    // Helper: Handle round winner
    const handleRoundWinner = () => {
        if (selectedCards.length === 0) return;
        const sortedSelectedCards = selectedCards.slice().sort((b, a) => {
            if (a.value === b.value) {
                return a.player > b.player ? 1 : -1;
            }
            return a.value - b.value;
        });
        const winner = sortedSelectedCards[0];
        setWinnersByRound(prev => {
            const existing = prev.find(w => w.player === winner.player);
            if (existing) {
                return prev.map(w =>
                    w.player === winner.player
                        ? { ...w, score: w.score + winner.value, byRound: numOfRounds + 1 }
                        : w
                );
            } else {
                return [
                    ...prev,
                    {
                        player: winner.player,
                        score: winner.value,
                        byRound: numOfRounds + 1
                    }
                ];
            }
        });
    };

    // Helper: Handle number of rounds
    const handleNumberOfRounds = () => {
        setNumOfRounds(prev => prev + 1);
    };

    const numOfWinnersByRound = winnersByRound?.length;

    /**
     * Handles click on a card
     *
     * @param player
     * @param selectedCard
     */
    const onClickCard = (player: number, selectedCard: Card) => {
        handleUpdatePlayersDecks(player, selectedCard);
        addSelectedCards(player, selectedCard);
        // No direct call to handleNextPlayerOrRound here
    }

    // Handles next player turn or round logic (replaces useEffect)
    const handleNextPlayerOrRound = (selectedCards: SelectedCard[], playersDecks: Card[][]) => {
        const numOfSelectedCards = selectedCards.length;
        if (numOfSelectedCards < numOfPlayers) {
            setTimeout(() => {
                const player = numOfSelectedCards + 1;
                const playerDeck = playersDecks[player - 1];
                if (!playerDeck) return;
                const playerCards = playerDeck.map(deck => ({
                    image: deck.image,
                    value: String(getCardValue(deck)), 
                    player
                }));
                const selectedCard = playerCards[Math.floor(Math.random() * playerCards.length)];
                onClickCard(player, selectedCard);
            }, 1000);
        } else if (numOfSelectedCards === numOfPlayers) {
            handleRoundWinner();
            handleNumberOfRounds();

            if (numOfRounds + 1 === 10) {
                const sortedWinnersByRound = winnersByRound.slice().sort((b, a) => {
                    return a.score > b.score ? 1 : -1;
                });
                const gameWinners = sortedWinnersByRound.reduce<WinnerByRound[]>((acc, curr, i) => {
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

            setTimeout(() => removeSelectedCards(), 1000);
        }
    };

    // Handles next player turn or round logic (triggered by state changes)
    useEffect(() => {
        if (selectedCards.length > 0) {
            handleNextPlayerOrRound(selectedCards, playersDecks);
        }
    }, [selectedCards, numOfPlayers, playersDecks]);

    // Prevent page unload if game is in progress
    useEffect(() => {
        const handler = (event: BeforeUnloadEvent) => {
            if (selectedCards.length > 0) {
                event.preventDefault();
            }
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [selectedCards.length]);

    // Initialize players decks once when drawCards is available and playersDecks is empty
    if (drawCards && playersDecks.length === 0) {
        const chunkSize = 10;
        const playersCards = drawCards.map((card, i) => {
            return i % chunkSize === 0 ? drawCards.slice(i, i + chunkSize) : null;
        }).filter((card): card is Card[] => card !== null);

        handleUpdatePlayersDecks(undefined, undefined, playersCards as Card[][]);
    }

    return (
        <div className={style.GameWrapper}>
            {showGameStartNotification && <NotificationBar>
                <p className={style.NotificationBarMessage}>
                    Welcome. To start the game, click on one of the cards from your deck. Good Luck!
                </p>
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
            />
            }
        </div>
    );
}

export default GamePlay;
