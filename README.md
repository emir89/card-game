# Card Clash

A fast and fun multiplayer card game built with React 19, Vite, and TypeScript. This project demonstrates modern React development using hooks, React Query, and an interactive UI. The game is ideal for practicing component architecture, state management, and multiplayer logic.

## Game Overview

Card Clash is a simple turn-based card game for 2–4 players. Each player draws a hand of cards and competes over multiple rounds to see who scores the most points. The game uses a standard deck of cards and determines a winner each round based on the highest card played.

## How to Play
1. **Choose Number of Players:** On the home screen, select between 2, 3, or 4 players.
2. **Game Start:** Each player receives a deck of cards.
3. **Rounds:**
   - Each round, players select a card from their deck.
   - Once all players have selected, the cards are revealed.
   - The player with the highest card wins the round and scores a point.
   - In case of a tie, priority is given to the player with the lower player number.
4. **Game End:** After all rounds are played, the player(s) with the highest score win.

## Features
- Multiplayer support (2–4 players, local pass-and-play)
- Animated, interactive card selection and reveal
- Real-time winner calculation for each round
- Visual scoreboard and winner announcement
- Responsive, modern UI

## Technologies Used
- **React 19** (with hooks)
- **TypeScript**
- **Vite** (for fast development)
- **React Query** (for async data fetching)
- **React Router DOM** (for navigation)
- **CSS Modules** (for component-scoped styles)
- **Deck of Cards API** (for real card data)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) (used for dependency management)

### Installation
```bash
yarn install
```

### Running the App
```bash
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
```bash
yarn build
```

## Project Structure
- `src/containers` — Main app containers and pages
- `src/containers/GamePlayPage/components` — Game UI components (decks, cards, scoreboard, etc.)
- `src/util` — Utility functions and game logic
- `public/` — Static assets

