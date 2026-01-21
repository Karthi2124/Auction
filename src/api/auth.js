import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const signup = (data) =>
  axios.post(`${API}/signup`, data);

export const signin = (data) =>
  axios.post(`${API}/signin`, data);
