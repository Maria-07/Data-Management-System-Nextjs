//staff department api will be handled here

import { apiSlice } from "../../api/apiSlice";

export const workingScheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //dept. supervisor list
    getWorkingSchedule: builder.query({
      query: ({ id, token }) => ({
        url: `inadmin/provider/get/working/schedule/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
      }),
      providesTags: ["workingSchedule"],
    }),

    //update staff supervisor
    updateWorkingSchedule: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/create/working/schedule",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["workingSchedule"],
    }),

    //list block-off time
    getBlockOffTime: builder.query({
      query: ({ id, token }) => ({
        url: "inadmin/provider/list/block/off/time",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ staff_id: id }),
      }),
      providesTags: ["blockOffTime"],
    }),

    //add block-off time
    createBlockOfftime: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/create/block/off/time",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["blockOffTime"],
    }),

    //delete block-off time
    deleteBlockOffTime: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/delete/block/off/time",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["blockOffTime"],
    }),
  }),
});

export const {
  useGetWorkingScheduleQuery,
  useUpdateWorkingScheduleMutation,
  useCreateBlockOfftimeMutation,
  useGetBlockOffTimeQuery,
  useDeleteBlockOffTimeMutation,
} = workingScheduleApi;
