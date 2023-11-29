//patient authorization related apis will be handled here

import { api } from "@/Redux/api/apiSlice";

export const FullCalendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get all event calendar
    getCalendarEventApi: builder.query({
      query: ({ token, payload }) => ({
        url: `/inadmin/calender/list`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      //   providesTags: ["PatientAuthorizationTable"],
    }),

    // get single session
    singleAppointmentApi: builder.query({
      query: ({ token, payload }) => ({
        url: `/inadmin/calender/single/appointment`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      //   providesTags: ["PatientAuthorizationTable"],
    }),
  }),
});

export const { useGetCalendarEventApiQuery, useSingleAppointmentApiQuery } =
  FullCalendarApi;
