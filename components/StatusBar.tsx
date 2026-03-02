"use client";

import { observer } from "mobx-react-lite";
import { Badge } from "@/components/ui/badge";
import { gameStore, type Player } from "@/store/gameStore";
import { cn } from "@/lib/utils";

const PLAYER_BADGE: Record<Player, string> = {
  1: "bg-red-500 hover:bg-red-500 text-white",
  2: "bg-yellow-400 hover:bg-yellow-400 text-gray-900",
};

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
        className={cn(
          "w-5 h-5 rounded-full",
          currentPlayer === 1 ? "bg-red-500" : "bg-yellow-400",
        )}
      />
    </div>
  );
});
