import axios from "axios";
import Cookies from "js-cookie";
import { Auth } from "./auth";
import { Recipe } from "./recipe";
import { User } from "./user";

export default class ApiClient {
  auth: Auth;
  recipe: Recipe;
  user: User;
  constructor() {
    this.auth = new Auth();
    this.recipe = new Recipe();
    this.user = new User();

    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    axios.defaults.baseURL = "http://127.0.0.1:3001/api/";
  }
}
