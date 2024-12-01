import axios from "axios";

export const backend = axios.create({
  baseURL: "https://www.googleapis.com/",
});
