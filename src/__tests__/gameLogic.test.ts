import { getWinningCardImage } from '../util/gameLogic';
import { SelectedCard } from '../containers/GamePlayPage/components/GamePlay/../../types';

describe('getWinningCardImage', () => {
  const cardA = { image: 'A.png', value: 10, player: 1 };
  const cardB = { image: 'B.png', value: 8, player: 2 };
  const cardC = { image: 'C.png', value: 10, player: 3 };
  const cardD = { image: 'D.png', value: 7, player: 4 };

  it('returns undefined if cards.length !== numPlayers', () => {
    expect(getWinningCardImage([cardA, cardB], 3)).toBeUndefined();
  });

  it('returns the image of the card with the highest value', () => {
    expect(getWinningCardImage([cardA, cardB], 2)).toBe('A.png');
  });

  it('returns the image of the card with the highest value and lowest player number if tied', () => {
    expect(getWinningCardImage([cardA, cardC], 2)).toBe('A.png');
    expect(getWinningCardImage([cardC, cardA], 2)).toBe('A.png');
  });

  it('returns the correct image when there are multiple cards and a tie', () => {
    expect(getWinningCardImage([cardA, cardB, cardC], 3)).toBe('A.png');
    expect(getWinningCardImage([cardB, cardC, cardA], 3)).toBe('A.png');
  });

  it('returns the correct image for 4 players, no ties', () => {
    expect(getWinningCardImage([cardA, cardB, cardC, cardD], 4)).toBe('A.png');
  });

  it('returns undefined for empty input', () => {
    expect(getWinningCardImage([], 2)).toBeUndefined();
  });
});
