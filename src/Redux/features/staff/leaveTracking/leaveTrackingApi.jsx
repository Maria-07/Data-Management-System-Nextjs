import { api } from "@/Redux/api/apiSlice";

const leaveTrackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // leave tracking get All data
    getLeaveTracking: builder.query({
      query: ({ token, payload  }) => ({
        url: `leave-tracking`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["LeaveTrack"],
    }),
    //Staff leave Tracking Update
    addLeaveTracking: builder.mutation({
      query: ({ token, payload }) => ({
        url: "leave-tracking/create",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["LeaveTrack"],
    }),

    // delete leave tracking
    DeleteLeaveTracking: builder.mutation({
      query: ({ token, payload }) => ({
        url: "leave-tracking/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          //"x-auth-token": token,
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["LeaveTrack"],
    }),
  }),
});

export const {
  useGetLeaveTrackingQuery,
  useAddLeaveTrackingMutation,
  useDeleteLeaveTrackingMutation,
} = leaveTrackApi;
