import type { ConfigModelType } from "@utils/types/models/config";

export interface SystemStoreData {
    theme: "light" | "dark" | "default"; 
    config?: ConfigModelType;
};

export interface SystemStore {
  updateSystem: (partialSystem: Partial<SystemStoreData>) => void;
  setSystem: (system: SystemStoreData) => void;
  system: SystemStoreData;
  reset: () => void;
};