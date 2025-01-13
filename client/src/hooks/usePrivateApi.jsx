import { useEffect } from "react";
import { API } from "../utils/config";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const usePrivateApi = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = API.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          const res = await API.get("/auth/refresh-token");

          if (res.data.success) {
            const decoded = jwtDecode(res.data.access_token);
            setUser({
              accessToken: res.data.access_token,
              user: decoded
            });

            originalRequest.headers.authorization = `Bearer ${res.data.access_token}`;
            originalRequest._retry = true;
          }

          return API(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.response.eject(responseInterceptor);
      API.interceptors.response.eject(requestInterceptor);
    };
  }, [user]);

  return API;
};

export default usePrivateApi;
