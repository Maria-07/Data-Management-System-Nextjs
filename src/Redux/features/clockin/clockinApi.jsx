import { api } from "@/Redux/api/apiSlice";

export const clockinApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Update punch
    updatePunch: builder.mutation({
      query: ({ token, payload }) => ({
        url: "punch",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

     // manual punch
     manualPunch: builder.mutation({
      query: ({ token, payload }) => ({
        url: "manual-punch",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

     // update punch
     updatePunchList: builder.mutation({
      query: ({ token, payload }) => ({
        url: "punch-in/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

  }),
});

export const {
  useUpdatePunchMutation,
  useManualPunchMutation,
  useUpdatePunchListMutation,
} = clockinApi;
