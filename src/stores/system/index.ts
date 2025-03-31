import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { systemStoreDefaultValues } from "./defaultValues";
import { SystemStore } from "./types";

const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      setSystem: (system) => set({ system }),
      system: systemStoreDefaultValues,
      updateSystem: (partialSystem) =>
        set((state) => ({
          system: { ...state.system, ...partialSystem },
        })),
      reset: () => {
        set({ system: systemStoreDefaultValues });
        localStorage.removeItem("system-store");
      },
    }),
    {
      name: "system-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSystemStore;