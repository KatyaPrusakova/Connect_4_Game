import { makeAutoObservable } from "mobx";

const ROWS = 6;
const COLS = 7;

export type Player = 1 | 2;
export type Cell = Player | null;

const WIN_DIRECTIONS = [
  [0, 1],  // horizontal
  [1, 0],  // vertical
  [1, 1],  // diagonal ↘
  [1, -1], // diagonal ↙
] as const;

class GameStore {
  board: Cell[][] = this.emptyBoard();
  currentPlayer: Player = 1;
  winner: Player | null = null;
  isDraw = false;

  constructor() {
    makeAutoObservable(this);
  }

  get gameOver() {
    return this.winner !== null || this.isDraw;
  }

  dropPiece(col: number): void {
    if (this.gameOver) return;

    const row = this.lowestEmptyRow(col);
    if (row === -1) return;

    this.board[row][col] = this.currentPlayer;

    if (this.checkWin(row, col)) {
      this.winner = this.currentPlayer;
    } else if (this.board[0].every((c) => c !== null)) {
      this.isDraw = true;
    } else {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
  }

  reset(): void {
    this.board = this.emptyBoard();
    this.currentPlayer = 1;
    this.winner = null;
    this.isDraw = false;
  }

  private lowestEmptyRow(col: number): number {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.board[r][col] === null) return r;
    }
    return -1;
  }

  private checkWin(row: number, col: number): boolean {
    const player = this.board[row][col];
    for (const [dr, dc] of WIN_DIRECTIONS) {
      let count = 1;
      for (const sign of [1, -1] as const) {
        let r = row + dr * sign;
        let c = col + dc * sign;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && this.board[r][c] === player) {
          count++;
          r += dr * sign;
          c += dc * sign;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  }

  private emptyBoard(): Cell[][] {
    return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null));
  }
}

export const gameStore = new GameStore();
