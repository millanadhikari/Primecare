import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const production = "https://primebackend.onrender.com/api";

const instance: AxiosInstance = axios.create({
  baseURL: 
  // process.env.NEXT_PUBLIC_API_BASE_URL || 
  production,
  // "http://localhost:3000/api",
  withCredentials: true, // send cookies like refreshToken
  headers: {
    "Content-Type": "application/json",
  },
});

// // Optional: attach access token dynamically if needed
// instance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     // You can read token from cookies, localStorage, or context
//     const token =
//       typeof window !== "undefined"
//         ? localStorage.getItem("accessToken")
//         : null;
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true;
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await instance.post("/auth/refresh-token");
        const newAccessToken = response.data.data.accessToken;

        // Retry all failed requests with new token
        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Optional: handle errors globally
// instance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Example: handle 401 Unauthorized (expired access token)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshRes = await instance.post('/auth/refresh-token');
//         const newAccessToken = refreshRes.data.accessToken;

//         if (newAccessToken) {
//           localStorage.setItem('accessToken', newAccessToken);
//           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//           return instance(originalRequest);
//         }
//       } catch (refreshErr) {
//         // Refresh failed, logout user if needed
//         localStorage.removeItem('accessToken');
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;
