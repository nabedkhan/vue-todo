import axiosIns from "axios";

const axios = axiosIns.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": import.meta.env.VITE_MASTER_KEY,
    "X-Access-Key": import.meta.env.VITE_ACCESS_KEY,
  },
});

export default axios;
