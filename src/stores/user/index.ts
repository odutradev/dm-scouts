import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { userStoreDefaultValues } from "./defaultValues";
import { UserStore } from "./types";

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      setUser: (user) => set({ user }),
      user: null,
      updateUser: (partialUser) =>
        set((state) => ({
          user: { ...state.user, ...partialUser },
        })),
      reset: () => {
        set({ user: userStoreDefaultValues });
        localStorage.removeItem("user-store");
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;