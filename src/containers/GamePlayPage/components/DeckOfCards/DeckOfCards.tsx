import React from 'react';
import style from './deckOfCards.module.css';
import classNames from 'classnames';
import CardImage from '../../../../assets/card.png';
import PropTypes from 'prop-types';

function DeckOfCards({
     cards,
     handleClickCard,
     numOfSelectedCards,
     players,
     winnersByRound,
     currentPlayer,
     playerOrder
}) {
    /**
     * Sets styling for each deck
     *
     * @returns {*}
     */
    function setDeckStyling() {
        let deckStyling;
        if (players > 2) {
            switch (playerOrder) {
                case 2:
                    deckStyling = style.Left;
                    break;
                case 3:
                    deckStyling = style.Top;
                    break;
                case 4:
                    deckStyling = style.Right;
                    break;
                default:
                    deckStyling = style.Bottom
            }
        } else {
            deckStyling = playerOrder === 1 ? style.Bottom : style.Top;
        }

        return deckStyling;
    }

    /**
     * Sets player info
     */
    function setPlayerInfo() {
        const playerScore = winnersByRound.find(winner => winner.player === playerOrder);

        return (
            <div className={style.PlayerInfo}>
                <span className={currentPlayer === playerOrder ? style.CurrentPlayer : style.PlayerName}>
                    {playerOrder === 1 ? 'You' : `Player ${playerOrder}`}
                </span>
                <span className={style.Score}>{`Score: ${playerScore ? playerScore.score : 0}`}</span>
            </div>
        );
    }

    const deckPosition = setDeckStyling();

    return (
        <div className={classNames(style.DeckWrapper, deckPosition)}>
            {setPlayerInfo()}
            <div
                data-testid={playerOrder === 1 ? "myDeckOfCard" : undefined}
            >
                {
                    cards && cards.map(card => {
                        return (
                            <img
                                data-testid={playerOrder === 1 ? "clickableCards" : undefined}
                                className={playerOrder === 1 ? classNames(style.Img, style.Clickable) : style.Img}
                                src={playerOrder === 1 ? card.image : CardImage}
                                onClick={() => {
                                    return playerOrder === 1 && numOfSelectedCards === 0 ?
                                        handleClickCard(playerOrder, card) : undefined
                                }}
                                alt="Deck card"
                                key={card.image}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

DeckOfCards.propTypes = {
    cards: PropTypes.array.isRequired,
    numOfSelectedCards: PropTypes.number.isRequired,
    players: PropTypes.number.isRequired,
    winnersByRound: PropTypes.array.isRequired,
    currentPlayer: PropTypes.number.isRequired,
    playerOrder: PropTypes.number.isRequired
};

export default DeckOfCards;
