"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Settings } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { gameStore } from "@/store/gameStore";

const rowOptions    = [4, 5, 6, 7, 8];
const colOptions    = [4, 5, 6, 7, 8, 9, 10];
const playerOptions = [2, 3, 4];

export const SettingsDialog = observer(() => {
  const [open, setOpen] = useState(false);
  const [rows, setRows]           = useState(gameStore.rows);
  const [cols, setCols]           = useState(gameStore.cols);
  const [numPlayers, setPlayers]  = useState(gameStore.numPlayers);

  const handleOpen = (v: boolean) => {
    if (v) { setRows(gameStore.rows); setCols(gameStore.cols); setPlayers(gameStore.numPlayers); }
    setOpen(v);
  };

  const handleApply = () => {
    gameStore.applySettings(rows, cols, numPlayers);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open settings">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Field label="Rows">
            <SelectNum value={rows} options={rowOptions} onChange={setRows} />
          </Field>
          <Field label="Columns">
            <SelectNum value={cols} options={colOptions} onChange={setCols} />
          </Field>
          <Field label="Players">
            <SelectNum value={numPlayers} options={playerOptions} onChange={setPlayers} />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleApply}>Apply &amp; Restart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

// ── helpers ──────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="w-20">{label}</Label>
      {children}
    </div>
  );
}

function SelectNum({
  value, options, onChange,
}: { value: number; options: number[]; onChange: (v: number) => void }) {
  return (
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={String(o)}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
