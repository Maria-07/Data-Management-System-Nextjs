import { api } from "@/Redux/api/apiSlice";

export const otherSetupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Get staff Other Setup
    getOtherSetup: builder.query({
      query: ({ token, id }) => ({
        url: `inadmin/provider/other/setup/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["OtherSetup"],
    }),

    addOtherSetup: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/other/setup/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["OtherSetup"],
    }),

    updatePassword: builder.mutation({
      query: ({ token, payload }) => ({
        url: "change-password",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["changePassword"],
    }),
  }),
});

export const { useGetOtherSetupQuery, useAddOtherSetupMutation, useUpdatePasswordMutation } =
  otherSetupApi;
