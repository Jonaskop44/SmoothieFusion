import { User } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import ApiClient from "@/api";

interface UserState {
  user: User;
  setUser: (user: User) => void;
  fetchUser: () => void;
  refreshToken: () => void;
}

const apiClient = new ApiClient();

export const userStore = create<UserState>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
  fetchUser: () => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    return apiClient.auth.helper
      .verifyToken(token)
      .then((response) => {
        if (response.status) {
          set({ user: response.data });
        } else {
          set({ user: {} as User });
        }
      })
      .catch(() => {
        set({ user: {} as User });
      });
  },
  refreshToken: () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return;

    return apiClient.auth.helper
      .refreshToken(refreshToken)
      .then((response) => {
        if (response.status) {
          Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 7,
          });
        }
      })
      .catch(() => {
        return { data: null, status: false };
      });
  },
}));
