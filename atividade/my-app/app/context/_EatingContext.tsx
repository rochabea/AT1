import React, { createContext, useContext, useMemo, useState } from "react";

export type Entry = { id: string; qty: number; at: number };

type EatingCtx = {
  entries: Entry[];
  addEntry: (qty: number) => void;
  totalPieces: number;
  lastEntryAt: number | null;
  avgIntervalMs: number | null;
};

const EatingContext = createContext<EatingCtx | undefined>(undefined);

export function EatingProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = (qty: number) => {
    setEntries(prev => [{ id: Math.random().toString(36).slice(2), qty, at: Date.now() }, ...prev]);
  };

  const totalPieces = useMemo(() => entries.reduce((s, e) => s + e.qty, 0), [entries]);
  const lastEntryAt = entries.length ? entries[0].at : null;

  const avgIntervalMs = useMemo(() => {
    if (entries.length < 2) return null;
    const sorted = [...entries].sort((a, b) => a.at - b.at);
    let sum = 0;
    for (let i = 1; i < sorted.length; i++) sum += sorted[i].at - sorted[i - 1].at;
    return sum / (sorted.length - 1);
  }, [entries]);

  const value = useMemo(() => ({ entries, addEntry, totalPieces, lastEntryAt, avgIntervalMs }), [
    entries, totalPieces, lastEntryAt, avgIntervalMs,
  ]);

  return <EatingContext.Provider value={value}>{children}</EatingContext.Provider>;
}

export const useEating = () => {
  const ctx = useContext(EatingContext);
  if (!ctx) throw new Error("useEating must be used within EatingProvider");
  return ctx;
};

export function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return hh > 0
    ? [hh, mm, ss].map(n => String(n).padStart(2, "0")).join(":")
    : [mm, ss].map(n => String(n).padStart(2, "0")).join(":");
}
