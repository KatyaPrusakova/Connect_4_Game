"use client";

import { observer } from "mobx-react-lite";
import { Board } from "@/components/Board";
import { StatusBar } from "@/components/StatusBar";
import { SettingsDialog } from "@/components/SettingsDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { gameStore } from "@/store/gameStore";

export default observer(function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="flex flex-col items-center gap-6 py-16 px-8">

        {/* Header */}
           <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Connect 4
          </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" onClick={() => gameStore.reset()}>
          New Game
        </Button>
          <SettingsDialog />
          <ThemeToggle />
        </div>

        <StatusBar />
        <Board />
      </main>
    </div>
  );
})

