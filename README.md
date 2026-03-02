# Connect 4

A two-player Connect 4 game built with **Next.js**, **TypeScript**, **MobX**, and **shadcn/ui**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| State Management | MobX + mobx-react-lite |
| UI Components | shadcn/ui |
| Styling | Tailwind |

## Project Structure

```
store/
  gameStore.ts       # MobX observable store — board state, turn logic, win/draw detection
components/
  Board.tsx          # 6×7 interactive grid, full-column feedback
  StatusBar.tsx      # Current player indicator, winner/draw badge
app/
  page.tsx           # Root page composing all components
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Game Rules

- Two players alternate dropping pieces into a 7-column, 6-row grid
- A piece falls to the lowest empty row in the chosen column
- First player to connect **4 in a row** (horizontal, vertical, or diagonal) wins
- If the board fills with no winner, the game ends in a draw


## Configuration

Board size and player count can be changed **at runtime** via the ⚙️ settings icon in the UI (applies immediately and restarts the game), or hardcoded as defaults in the store:

| Setting | Store field | UI range | Default |
|---|---|---|---|
| Rows | `gameStore.rows` | 4 – 8 | 6 |
| Columns | `gameStore.cols` | 4 – 10 | 7 |
| Players | `gameStore.numPlayers` | 2 – 4 | 2 |

Player colors are defined in `components/Board.tsx` (`PLAYER_COLORS` array) and `components/StatusBar.tsx` (`PLAYER_BADGE` / `PLAYER_DOT` arrays) — add or change entries at indices 1–4.

## Further Implementation Ideas


- **Score tracking** — persist win/loss/draw counts across games using `localStorage`
- **Animations** — animate pieces dropping down the column using CSS keyframes or Framer Motion
- **Winning highlight** — highlight the four winning cells when the game ends
- **Undo move** — store move history in the MobX store and allow stepping back
- **Online multiplayer** — use WebSockets (e.g. Socket.io or Partykit) for real-time two-player over the network
- **Custom player names** — let players enter their names before the game starts
- **Responsive layout** — scale the board size dynamically for mobile screens
- **Sound effects** — play a click on piece drop and a fanfare on win
