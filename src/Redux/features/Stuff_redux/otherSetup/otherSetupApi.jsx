//staff other setup api will be handled here
import { apiSlice } from "../../api/apiSlice";

export const otherSetupApi = apiSlice.injectEndpoints({
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
  }),
});

export const { useGetOtherSetupQuery, useAddOtherSetupMutation } = otherSetupApi;
