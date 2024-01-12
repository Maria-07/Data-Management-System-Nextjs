import { api } from "@/Redux/api/apiSlice";

export const timesheetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Update call log
    updateTimesheet: builder.mutation({
      query: ({ token, payload }) => ({
        url: "timesheet/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

     // submit Timesheet
     submitTimesheet: builder.mutation({
      query: ({ token, payload }) => ({
        url: "timesheet/submit",
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
  useUpdateTimesheetMutation,
  useSubmitTimesheetMutation,
} = timesheetApi;
