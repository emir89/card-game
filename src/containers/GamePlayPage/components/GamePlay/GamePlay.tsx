import { useState, useEffect } from 'react';
import style from './gamePLay.module.css';
import { getWinningCardImage } from 'util/gameLogic';
import NotificationBar from 'commonComponents/NotificationBar/NotificationBar';
import SelectedCards from '../SelectedCards/SelectedCards';
import DeckOfCards from '../DeckOfCards/DeckOfCards';
import { hashString } from 'util/hash';
import GameWinner from '../GameWinner/GameWinner';
import { getCardValue } from 'util/card';
import { Card, SelectedCard, WinnerByRound } from '../../types';

type GamePlayProps = {
  drawCards: Card[] | null;
  numOfPlayers: number;
};

const GamePlay = ({ drawCards, numOfPlayers }: GamePlayProps) => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [winnersByRound, setWinnersByRound] = useState<WinnerByRound[]>([]);
  const [numOfRounds, setNumOfRounds] = useState<number>(0);
  const [playersDecks, setPlayersDecks] = useState<Card[][]>([]);
  const [gameWinners, setGameWinners] = useState<WinnerByRound[]>([]);

  const showGameStartNotification = numOfRounds === 0 && selectedCards?.length === 0;

  // Helper: Add selected card
  const addSelectedCards = (player: number, selectedCard: Card) => {
    setSelectedCards((prev) => [
      ...prev,
      {
        image: selectedCard.image,
        value: getCardValue(selectedCard),
        player,
      },
    ]);
  };

  // Helper: Remove selected cards
  const removeSelectedCards = () => {
    setSelectedCards([]);
  };

  // Helper: Update players decks
  const handleUpdatePlayersDecks = (
    player?: number,
    selectedCard?: Card,
    playerDecksOverride?: Card[][]
  ) => {
    if (!player) {
      setPlayersDecks(playerDecksOverride ?? []);
      return;
    }
    if (selectedCard) {
      setPlayersDecks((prev) =>
        prev.map((deck, idx) =>
          idx === player - 1 ? deck.filter((card) => card.image !== selectedCard.image) : deck
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
    setWinnersByRound((prev) => {
      const existing = prev.find((w) => w.player === winner.player);
      if (existing) {
        return prev.map((w) =>
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
            byRound: numOfRounds + 1,
          },
        ];
      }
    });
  };

  // Helper: Handle number of rounds
  const handleNumberOfRounds = () => {
    setNumOfRounds((prev) => prev + 1);
  };

  // useEffect to determine overall winner after last round
  useEffect(() => {
    if (numOfRounds === 10) {
      // Sort the winners by score in descending order
      const sortedWinnersByRound = winnersByRound.slice().sort((b, a) => {
        return a.score > b.score ? 1 : -1;
      });
      // Gather all players who have the highest score (handle ties)
      const gameWinners = sortedWinnersByRound.reduce<WinnerByRound[]>((acc, curr, i) => {
        if (i === 0) {
          acc.push(curr);
        } else {
          if (acc[0].score === curr.score) {
            acc.push(curr);
          }
        }
        return acc;
      }, []);
      setGameWinners(gameWinners);
    }
  }, [winnersByRound, numOfRounds]);

  /**
   * Handles click on a card
   *
   * @param player
   * @param selectedCard
   */
  const onClickCard = (player: number, selectedCard: Card) => {
    handleUpdatePlayersDecks(player, selectedCard);
    addSelectedCards(player, selectedCard);
  };

  // Handles the logic for progressing to the next player's turn or moving to the next round.
  const handleNextPlayerOrRound = (selectedCards: SelectedCard[], playersDecks: Card[][]) => {
    // Count how many cards have been selected in the current round
    const numOfSelectedCards = selectedCards.length;

    // If not all players have selected a card yet, move to the next player's turn
    if (numOfSelectedCards < numOfPlayers) {
      setTimeout(() => {
        // Determine the next player's index (1-based)
        const player = numOfSelectedCards + 1;
        // Get the current player's deck
        const playerDeck = playersDecks[player - 1];
        if (!playerDeck) return; // If no deck found, exit

        // Map the player's deck to the card objects with image, value, and player number
        const playerCards = playerDeck.map((deck) => ({
          image: deck.image,
          value: String(getCardValue(deck)),
          player,
        }));
        // Randomly select a card for the player
        const selectedCard = playerCards[Math.floor(Math.random() * playerCards.length)];
        // Trigger the card selection for the current player
        onClickCard(player, selectedCard);
      }, 1000); // Wait 1 second before next player's turn (for UX pacing)
    } else if (numOfSelectedCards === numOfPlayers) {
      // All players have selected a card, determine the round winner
      handleRoundWinner();
      // Update the number of rounds played
      handleNumberOfRounds();

      // After a short delay, remove selected cards to prepare for the next round
      setTimeout(() => {
        removeSelectedCards();
      }, 1000);
    }
  };

  // Handles next player turn or round logic (triggered by state changes)
  useEffect(() => {
    if (selectedCards.length > 0) {
      handleNextPlayerOrRound(selectedCards, playersDecks);
    }
  }, [selectedCards, numOfPlayers, playersDecks]);

  // Initialize players decks once when drawCards is available and playersDecks is empty
  if (drawCards && playersDecks.length === 0) {
    const chunkSize = 10;
    const playersCards: Card[][] = [];
    for (let i = 0; i < drawCards.length; i += chunkSize) {
      playersCards.push(drawCards.slice(i, i + chunkSize));
    }
    handleUpdatePlayersDecks(undefined, undefined, playersCards);
  }

  // Use the shared helper for determining the winning card image
  const winningCardImage = getWinningCardImage(selectedCards, numOfPlayers);

  return (
    <div>
      {showGameStartNotification && (
        <NotificationBar>
          <p className={style.NotificationBarMessage}>
            Welcome. To start the game, click on one of the cards from your deck. Good Luck!
          </p>
        </NotificationBar>
      )}
      <SelectedCards
        selectedCards={selectedCards}
        winningCardImage={winningCardImage}
      />
      <div className={style.CircleTable}>
        {playersDecks?.map((deck, i) => {
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
              key={hashString(`deck-player-${i + 1}-${deck[0]?.image || ''}`)}
            />
          );
        })}
      </div>
      {gameWinners.length > 0 ? <GameWinner gameWinners={gameWinners} /> : null}
    </div>
  );
};

export default GamePlay;
