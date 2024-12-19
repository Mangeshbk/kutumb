import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.Authorization = `${token}`;
};
