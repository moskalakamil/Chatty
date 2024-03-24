import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
interface AuthStore {
  token: string | null;
  setToken: (v: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      setToken: val => set({token: val}),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
