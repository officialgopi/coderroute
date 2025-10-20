import axios from "axios";
import { env } from "../env";

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL + "/api",
  withCredentials: true,
});

export { api };
