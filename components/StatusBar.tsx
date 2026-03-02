"use client";

import { observer } from "mobx-react-lite";
import { Badge } from "@/components/ui/badge";
import { gameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

// index 0 unused; indices 1-4 map to player numbers
const PLAYER_BADGE = [
  "",
  "bg-red-500 hover:bg-red-500 text-white",
  "bg-yellow-400 hover:bg-yellow-400 text-gray-900",
  "bg-green-500 hover:bg-green-500 text-white",
  "bg-purple-500 hover:bg-purple-500 text-white",
];

const PLAYER_DOT = ["", "bg-red-500", "bg-yellow-400", "bg-green-500", "bg-purple-500"];

export const StatusBar = observer(() => {
  const { currentPlayer, winner, isDraw } = gameStore;

  if (isDraw) {
    return (
      <Badge variant="secondary" className="text-base px-4 py-2">
        It&apos;s a draw!
      </Badge>
    );
  }

  if (winner) {
    return (
      <Badge className={cn("text-base px-4 py-2", PLAYER_BADGE[winner])}>
        🎉 Player {winner} wins!
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-3 text-base font-medium">
      <span>Player {currentPlayer}&apos;s turn</span>
      <div
        className={cn("w-5 h-5 rounded-full", PLAYER_DOT[currentPlayer])}
      />
    </div>
  );
});
