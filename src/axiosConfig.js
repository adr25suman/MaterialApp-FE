import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Bearer token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or sessionStorage)
    const token = localStorage.getItem("jwt");

    if (token) {
      // If token exists, add it to the Authorization header as Bearer token
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
