import { apiSlice } from "../../api/apiSlice";

//
const leaveTrackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // leave tracking get All data
    getLeaveTracking: builder.query({
      query: ({ payload, token }) => ({
        url: `inadmin/provider/ac/staff/leave/tracking`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["LeaveTrack"],
    }),
    //Staff leave Tracking Update
    addLeaveTracking: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/ac/staff/leave/tracking/save",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["LeaveTrack"],
    }),

    // delete leave tracking
    DeleteLeaveTracking: builder.mutation({
      query: ({ token, payload }) => ({
        url: "inadmin/provider/ac/staffs/leave/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["LeaveTrack"],
    }),
  }),
});

export const { useGetLeaveTrackingQuery, useAddLeaveTrackingMutation, useDeleteLeaveTrackingMutation } = leaveTrackApi;
