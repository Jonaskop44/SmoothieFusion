import { User } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import ApiClient from "@/api";

interface UserState {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  fetchUser: () => void;
  logout: () => void;
  refreshToken: () => void;
}

const apiClient = new ApiClient();

export const userStore = create<UserState>((set) => ({
  user: {} as User,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user.id }),
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: {} as User, isLoggedIn: false });
  },
  fetchUser: () => {
    return apiClient.user.helper
      .getUserInfo()
      .then((response) => {
        if (response.status) {
          set({ user: response.data, isLoggedIn: true });
        } else {
          set({ user: {} as User, isLoggedIn: false });
        }
      })
      .catch(() => {
        set({ user: {} as User, isLoggedIn: false });
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
