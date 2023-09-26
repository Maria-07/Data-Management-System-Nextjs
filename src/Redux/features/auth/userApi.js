import { api } from "@/Redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useLoginMutation } = userApi;
