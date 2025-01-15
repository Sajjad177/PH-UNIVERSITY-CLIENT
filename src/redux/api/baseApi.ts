import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include", // send cookie with request

  // we can set authorization header with token from redux store [check it in network tab] there will be token or not
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      // if you use Bearer in backend then you have to use Bearer ${token} there
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

// custome baseQuery for refresh token :
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // if user not found :
  if (result?.error?.status === 404) {
    toast.error((result.error.data as any).message);
  }

  if (result?.error?.status === 401) {
    // send refresh token to get new access token :
    console.log("sending refresh token  ");

    const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,

  // endpoints added in authApi:
  endpoints: () => ({}),
});
