import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PROD
        ? import.meta.env.VITE_BACKEND_SERVER_PROD
        : "http://localhost:1337/api",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { api };