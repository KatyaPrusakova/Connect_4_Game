import { makeAutoObservable } from "mobx";

export type Cell = number | null;

const WIN_DIRECTIONS = [
  [0, 1],  // horizontal
  [1, 0],  // vertical
  [1, 1],  // diagonal ↘
  [1, -1], // diagonal ↙
] as const;

class GameStore {
  // configurable settings
  rows = 6;
  cols = 7;
  numPlayers = 2;

  board: Cell[][] = this.emptyBoard();
  currentPlayer = 1;
  winner: number | null = null;
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
      this.currentPlayer = (this.currentPlayer % this.numPlayers) + 1;
    }
  }

  applySettings(rows: number, cols: number, numPlayers: number): void {
    this.rows = rows;
    this.cols = cols;
    this.numPlayers = numPlayers;
    this.reset();
  }

  reset(): void {
    this.board = this.emptyBoard();
    this.currentPlayer = 1;
    this.winner = null;
    this.isDraw = false;
  }

  private lowestEmptyRow(col: number): number {
    for (let r = this.rows - 1; r >= 0; r--) {
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
        while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === player) {
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
    return Array.from({ length: this.rows }, () => Array<Cell>(this.cols).fill(null));
  }
}

export const gameStore = new GameStore();
