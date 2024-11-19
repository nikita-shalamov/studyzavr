import { IUser } from "@/types/user.types";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  error: string;
  loading: boolean;
  setUser: (data: IUser) => void;
  setError: (error: string) => void;
  setLoading: (status: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  loading: true,
  error: "",
  setUser: (data) => set({ user: data }),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error: error }),
  clearUser: () => set({ user: null, error: "", loading: false }),
}));
