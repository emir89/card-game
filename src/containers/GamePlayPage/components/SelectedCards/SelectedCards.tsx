import style from './selectedCards.module.css';
import classNames from 'classnames';
import { hashString } from 'util/hash';
import { SelectedCard } from 'containers/GamePlayPage/types';

interface SelectedCardsProps {
  selectedCards: SelectedCard[];
  winningCardImage?: string;
}

const SelectedCards = ({ selectedCards, winningCardImage }: SelectedCardsProps) => {
  return (
    <div className="CenterWrapper">
      {selectedCards?.map((card) => {
        return (
          <img
            data-testid="selectedCard"
            className={classNames(style.SelectedImg, {
              [style.WinningCard]: winningCardImage === card.image,
            })}
            src={card.image}
            alt="Deck card"
            key={hashString(`${card.image}-${card.player}`)}
            width={100}
            height={140}
          />
        );
      })}
    </div>
  );
};

export default SelectedCards;
