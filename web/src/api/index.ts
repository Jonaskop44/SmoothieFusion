import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "./auth";

export default class ApiClient {
  auth: Auth;
  constructor() {
    this.auth = new Auth();

    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    axios.defaults.baseURL = "http://127.0.0.1:3001/api/";
  }
}
