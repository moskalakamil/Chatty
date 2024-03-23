import {create} from "zustand";

export type AppState = "LOADING" | "NEED_AUTH" | "AUTHORIZED";

interface AppStateStore {
  appState: AppState;
  setAppState: (v: AppState) => void;
}

export const useAppStateStore = create<AppStateStore>(set => ({
  appState: "LOADING",
  setAppState: v => set({appState: v}),
}));
