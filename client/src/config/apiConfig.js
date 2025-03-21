import axios from "axios";

export const API_URL = "http://localhost:2288";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${jwt}` ,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
