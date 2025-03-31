import { UserModelType } from "@utils/types/models/user";

export interface UserStoreData {
    
};

export interface UserStore {
  updateUser: (partialUser: Partial<UserStoreData>) => void;
  setUser: (user: UserStoreData) => void;
  user: Partial<UserModelType | null>;
  reset: () => void;
};