// Shared types for GamePlayPage and related components

export interface Card {
  image: string;
  value: string;
}

export interface SelectedCard {
  image: string;
  value: number;
  player: number;
}

export interface WinnerByRound {
  player: number;
  score: number;
  byRound: number;
}
