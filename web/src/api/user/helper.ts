import axios from "axios";

export class Helper {
  constructor() {}

  async getUserInfo() {
    return axios
      .get("/user/info")
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
