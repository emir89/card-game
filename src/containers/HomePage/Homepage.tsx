import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './homepage.module.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    function handleStartOfGame(numOfPlayers: number) {
        navigate(`/game-play/${numOfPlayers}`);
    }

    return (
        <div className="CenterWrapperColumn">
            <div className={style.NumberOfPlayersText}>
                <h2>Select number of players</h2>
            </div>
            <div className={style.NumberOfPlayersButtons}>
                <button onClick={() => handleStartOfGame(2)}>2 Players</button>
                <button onClick={() => handleStartOfGame(3)}>3 Players</button>
                <button onClick={() => handleStartOfGame(4)}>4 Players</button>
            </div>
        </div>
    );
};

export default HomePage;
