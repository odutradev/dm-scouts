export interface SystemStoreData {
    theme: "light" | "dark" | "default"; 
};

export interface SystemStore {
  updateSystem: (partialSystem: Partial<SystemStoreData>) => void;
  setSystem: (system: SystemStoreData) => void;
  system: SystemStoreData;
  reset: () => void;
};