//manage sessions api will be handled here

import { api } from "@/Redux/api/apiSlice";

export const recurringSessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Recurring Session Get Patient
    recurringGetAllInfos: builder.mutation({
      query: ({ url, token, payload }) => ({
        url: 'appointment/recurring/list',
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      // invalidatesTags: ["ManageSession"],
    }),
  }),
});

export const { useRecurringGetAllInfosMutation } = recurringSessionApi;
