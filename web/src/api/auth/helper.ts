import { User } from "@/types/user";
import axios from "axios";

export class Helper {
  constructor() {}

  async login(user: User) {
    return axios
      .post("/auth/login/", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async register(user: User) {
    return axios
      .post("/auth/signup/", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status !== 201) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async verifyToken(token: string) {
    return axios
      .get("/auth/verify-token/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async refreshToken(token: string) {
    return axios
      .get("/auth/refresh-token/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }
}
