import axios from "axios";
export const API = axios.create({
  baseURL: "https://console.fastforex.io/",
});
