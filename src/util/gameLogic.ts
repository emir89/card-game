import { SelectedCard } from 'containers/GamePlayPage/types';

/**
 * Returns the image of the winning card for the round.
 * Sorts by value descending, then by player ascending if values are equal.
 * @param cards Array of selected cards
 * @param numPlayers Number of players
 */
export function getWinningCardImage(cards: SelectedCard[], numPlayers: number): string | undefined {
  if (cards.length !== numPlayers) return undefined;
  const sorted = cards.slice().sort((a, b) => {
    if (b.value === a.value) {
      return a.player - b.player;
    }
    return b.value - a.value;
  });
  return sorted[0]?.image;
}
