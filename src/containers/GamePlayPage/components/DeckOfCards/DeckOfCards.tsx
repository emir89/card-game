import style from './deckOfCards.module.css';
import classNames from 'classnames';
import CardImage from '../../../../assets/card.png';
import { hashString } from 'util/hash';

import { Card, WinnerByRound } from 'containers/GamePlayPage/types';

interface DeckOfCardsProps {
  cards: Card[];
  handleClickCard: (player: number, selectedCard: Card) => void;
  numOfSelectedCards: number;
  players: number;
  winnersByRound: WinnerByRound[];
  currentPlayer: number;
  playerOrder: number;
}

const DeckOfCards = ({
  cards,
  handleClickCard,
  numOfSelectedCards,
  players,
  winnersByRound,
  currentPlayer,
  playerOrder,
}: DeckOfCardsProps) => {
  /**
   * Sets styling for each deck
   *
   * @returns {*}
   */
  // For circular layout, calculate position by angle
  const setDeckStyling = () => {
    switch (players) {
      case 2:
        if (playerOrder === 1) return style['Deck--bottom'];
        if (playerOrder === 2) return style['Deck--top'];
        break;
      case 3:
        if (playerOrder === 1) return style['Deck--bottom'];
        if (playerOrder === 2) return style['Deck--left'];
        if (playerOrder === 3) return style['Deck--right'];
        break;
      case 4:
        if (playerOrder === 1) return style['Deck--bottom'];
        if (playerOrder === 2) return style['Deck--left'];
        if (playerOrder === 3) return style['Deck--top'];
        if (playerOrder === 4) return style['Deck--right'];
        break;
      default:
        break;
    }
    return style['Deck--bottom'];
  };


  /**
   * Sets player info
   */
  const setPlayerInfo = () => {
    const playerScore = winnersByRound.find((winner) => winner.player === playerOrder);

    return (
      <div className={style.PlayerInfo}>
        <span
          className={classNames(
            style.PlayerInfo__name,
            currentPlayer === playerOrder && style['PlayerInfo__name--current']
          )}
        >
          {playerOrder === 1 ? 'You' : `Player ${playerOrder}`}
        </span>
        <span
          className={style.PlayerInfo__score}
        >{`Score: ${playerScore ? playerScore.score : 0}`}</span>
      </div>
    );
  };

  const deckPosition = setDeckStyling();
  const isRoundInProgress = numOfSelectedCards > 0 && players !== numOfSelectedCards;

  // Compute the player info container className based on playerOrder and players
  const getPlayerInfoContainerClass = () => {
    if (playerOrder === 1) return style.PlayerInfoContainer;
    if (playerOrder === 2) return players === 2 ? style.PlayerInfoBottom : style.PlayerInfoLeft + ' ' + style.PlayerInfoContainer;
    if (playerOrder === 3) return players === 3 ? style.PlayerInfoRight + ' ' + style.PlayerInfoContainer : style.PlayerInfoBottom;
    if (playerOrder === 4) return style.PlayerInfoRight + ' ' + style.PlayerInfoContainer;
    return '';
  };


  return (
    <div className={classNames(style.Deck, deckPosition)}>
      <div className={getPlayerInfoContainerClass()}>{setPlayerInfo()}</div>
      <div className={style.CardsWrapper}>
        {playerOrder === 1 && cards.length === 0
          ? // Loading placeholder for player 1
            Array.from({ length: 10 }).map((_, i) => (
              <img
                className={classNames(style.Card, style['Card--placeholder'])}
                src={CardImage}
                alt="Loading card"
                key={hashString(`p1-loading-placeholder-${i}`)}
                width={60}
                height={90}
                aria-hidden="true"
              />
            ))
          : cards.map((card, i) => (
              <img
                data-testid={playerOrder === 1 ? 'clickableCards' : undefined}
                className={classNames(
                  style.Card,
                  playerOrder === 1 && !isRoundInProgress && style['Card--clickable']
                )}
                src={playerOrder === 1 ? card.image : CardImage}
                onClick={
                  playerOrder === 1 && !isRoundInProgress && numOfSelectedCards === 0
                    ? () => handleClickCard(playerOrder, card)
                    : undefined
                }
                alt="Deck card"
                key={hashString(`${card.image}-${card.value}-${playerOrder}`)}
                loading="lazy"
                width={60}
                height={90}
              />
            ))}
      </div>
    </div>
  );
};

export default DeckOfCards;
