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

    getSessionList: builder.query({
      query: ({ token, id }) => ({
        url: `appointment/recurring/session/list/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["sessionData"],
    }),

    getDayViewList: builder.query({
      query: ({ token, id }) => ({
        url: `appointment/recurring/session/list/day-view/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["sessionData"],
    }),

    getDayList: builder.query({
      query: ({ token }) => ({
        url: `appointment/recurring/day/list`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["dayData"],
    }),

    deleteSessionId: builder.mutation({
      query: ({ token, payload }) => ({
        url: "appointment/recurring/session/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["deleteSessionData"],
    }),

    getProvidersList: builder.query({
      query: ({ token }) => ({
        url: `appointment/recurring/filter/providers`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["dayData"],
    }),

    getStatusList: builder.query({
      query: ({ token }) => ({
        url: `appointment/status`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["statusData"],
    }),

    deleteBulkSession: builder.mutation({
      query: ({ token, payload }) => ({
        url: "appointment/recurring/session/delete/bulk",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["deleteSessionData"],
    }),

    moveSession: builder.mutation({
      query: ({ token, payload }) => ({
        url: "appointment/recurring/move",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["deleteSessionData"],
    }),

    updateSession: builder.mutation({
      query: ({ token, payload }) => ({
        url: "appointment/recurring/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["updateSessionData"],
    }),

  }),
});

export const { 
  useRecurringGetAllInfosMutation,
  useGetSessionListQuery,
  useGetDayViewListQuery,
  useGetDayListQuery,
  useDeleteSessionIdMutation,
  useGetProvidersListQuery,
  useGetStatusListQuery,
  useDeleteBulkSessionMutation,
  useMoveSessionMutation,
  useUpdateSessionMutation
} = recurringSessionApi;
