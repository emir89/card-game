import style from './gameWinner.module.css';
import { WinnerByRound } from 'containers/GamePlayPage/types';
import { useNavigate } from 'react-router-dom';

const GameWinner = ({ gameWinners }: { gameWinners: WinnerByRound[] }) => {
  const navigate = useNavigate();
  const oneOrMoreWinners = `The ${gameWinners.length > 1 ? 'winners are' : 'winner is'}:`;

  return (
    <div className={style.Overlay}>
      <div className={`${style.Modal} ${style['Modal--winner']}`}>
        {/* Confetti SVG effect */}
        <svg
          className={style.Confetti}
          width="100%"
          height="70"
          viewBox="0 0 400 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="30" cy="20" r="5" fill="#fbbf24" />
          <circle cx="70" cy="30" r="4" fill="#f59e42" />
          <circle cx="120" cy="10" r="3" fill="#60a5fa" />
          <circle cx="180" cy="35" r="6" fill="#34d399" />
          <circle cx="240" cy="15" r="5" fill="#f87171" />
          <circle cx="320" cy="28" r="4" fill="#fbbf24" />
          <circle cx="370" cy="18" r="3" fill="#f59e42" />
        </svg>
        <div className={style.Trophy} role="img" aria-label="Trophy">
          🏆
        </div>
        <h1 className={`${style.Text} ${style['Text--winner']}`}>{oneOrMoreWinners}</h1>
        {gameWinners.map((winner) => (
          <p className={`${style.Text} ${style['Text--player']}`} key={winner.player}>
            {`${winner.player === 1 ? 'You' : 'Player ' + winner.player} - Score: ${winner.score}`}
          </p>
        ))}
        <button className={style.Button} onClick={() => navigate('/')}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GameWinner;
