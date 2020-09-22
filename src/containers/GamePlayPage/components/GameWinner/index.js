import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import style from './gameWinner.module.css'

function GameWinner({gameWinners, history}) {
    const oneOrMoreWinners = `The ${gameWinners.length > 1 ?
        'winners are' : 'winner is'}:`;

    return (
        <Modal isOpen={!!gameWinners.length}>
            <div className="CenterWrapperColumn">
                <div>
                    <h1 className={style.WinnerText}>{oneOrMoreWinners}</h1>
                </div>
                <div>
                    {
                        gameWinners.map(winner => {
                            return (
                                <p className={style.PlayerText} key={winner.player}>
                                    {`${winner.player === 1
                                        ? 'You'
                                        : 'Player ' + winner.player} - Score: ${winner.score}`}
                                </p>
                            )
                        })
                    }
                    <button className={style.CloseButton} onClick={() => history.push('/')}>Close</button>
                </div>
            </div>
        </Modal>
    )
}

GameWinner.propTypes = {
    gameWinners: PropTypes.array.isRequired,
    history: PropTypes.object
};

export default GameWinner;
