import React from 'react';
import PropTypes from 'prop-types';
import style from './selectedCards.module.css'

function SelectedCards({selectedCards}) {
    return (
      <div
          className="CenterWrapper"
      >
          {
            selectedCards?.map(card => {
                return <img
                    data-testid="selectedCard"
                    className={style.SelectedImg}
                    src={card.image}
                    alt="Deck card"
                    key={card.image}
                />
            })
          }
      </div>
    );
}

SelectedCards.propTypes = {
    selectedCards: PropTypes.array.isRequired
};

export default SelectedCards;
