import { Card } from '../containers/GamePlayPage/types';

/**
 * Gets card value when value of a card is not a number
 *
 * @param card
 * @returns {number}
 */

export function getCardValue(card: Card): number {
  const cardValue = card.value;
  switch (cardValue) {
    case 'ACE':
      return 1;
    case 'JACK':
      return 12;
    case 'QUEEN':
      return 13;
    case 'KING':
      return 14;
    default:
      return Number(cardValue);
  }
}
