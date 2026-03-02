"use client";

import { observer } from "mobx-react-lite";
import { Board } from "@/components/Board";
import { StatusBar } from "@/components/StatusBar";
import { Button } from "@/components/ui/button";
import { gameStore } from "@/store/gameStore";

export default observer(function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="flex flex-col items-center gap-8 py-16 px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Connect 4
        </h1>

        <StatusBar />
        <Board />

        <Button
          variant="outline"
          size="lg"
          onClick={() => gameStore.reset()}
          className="mt-2"
        >
          New Game
        </Button>
      </main>
    </div>
  );
})
