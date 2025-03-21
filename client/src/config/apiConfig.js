import axios from "axios";

export const API_URL = "https://e-commerce-server-oj8e.onrender.com";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${jwt}` ,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
