import {create} from "zustand";

export interface User {
  id: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (v: User | null) => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: v => set({user: v}),
}));
