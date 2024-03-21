import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ShowIntroScreens {
  showIntroScreens: boolean;
  setShowIntroScreens: (v: boolean) => void;
}

export const useShowIntroScreensStore = create<ShowIntroScreens>()(
    persist(
        (set) => ({
          showIntroScreens: true,
          setShowIntroScreens: (val) => set({ showIntroScreens: val }),
        }),
        {
          name: 'intro-screens-store',
          storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
