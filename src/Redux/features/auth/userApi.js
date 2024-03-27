import { api } from "@/Redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        //url: "/inadmin/auth",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["profile"],
    }),

    forgetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),

    getCodeToResetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/forgot-password-code",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useGetCodeToResetPasswordMutation,
} = userApi;