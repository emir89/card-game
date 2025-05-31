import React from 'react';
import Modal from 'react-modal';
import style from './gameWinner.module.css'
import { WinnerByRound } from '../../types';
import { useNavigate } from 'react-router-dom'

const GameWinner = ({gameWinners}: {gameWinners: WinnerByRound[]}) => {
    const navigate = useNavigate();
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
                    <button className={style.CloseButton} onClick={() => navigate('/')}>Close</button>
                </div>
            </div>
        </Modal>
    )
}

export default GameWinner;
