import axios from "axios";
import { apiAccessTokenAtom, store } from "../store";

export const API = axios.create({
  baseURL: "http://localhost:3000/",
});


API.interceptors.request.use(function (request) {
  const token = store.get(apiAccessTokenAtom);
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

API.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = API.post("/");
        localStorage.setItem("token", data.token);
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);


