"use client";

import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";
import { gameStore, type Cell } from "@/store/gameStore";

// index 0 unused; indices 1-4 map to player numbers
const PLAYER_COLORS = ["", "bg-red-500", "bg-yellow-400", "bg-green-500", "bg-purple-500"];

const CellDisc = ({ value }: { value: Cell }) => (
  <div
    className={cn(
      "w-20 h-20 rounded-full transition-all duration-200",
      value ? `${PLAYER_COLORS[value]} shadow-inner` : "bg-blue-100",
    )}
  />
);

export const Board = observer(() => {
  const { board, gameOver, cols } = gameStore;

  return (
    <div className="bg-blue-600 p-5 rounded-2xl shadow-2xl select-none">
      <div className="flex gap-3">
        {Array.from({ length: cols }, (_, col) => {
          const isColFull = board[0][col] !== null;
          return (
          <button
            key={col}
            disabled={gameOver || isColFull}
            onClick={() => gameStore.dropPiece(col)}
            className="flex flex-col items-center gap-3 rounded-lg p-1 hover:bg-blue-500 disabled:cursor-not-allowed transition-colors group"
            aria-label={`Drop piece in column ${col + 1}${isColFull ? " (full)" : ""}`}
          >
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest transition-opacity duration-200 text-white",
              isColFull ? "opacity-100" : "opacity-0 pointer-events-none",
            )}>
              Full
            </span>
            {board.map((row, rowIdx) => (
              <CellDisc key={rowIdx} value={row[col]} />
            ))}
          </button>
          );
        })}
      </div>
    </div>
  );
});
