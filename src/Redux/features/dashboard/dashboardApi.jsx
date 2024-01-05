import { api } from "@/Redux/api/apiSlice";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //get dashboard count  api
    getDashboardCount: builder.query({
      query: ({ token }) => ({
        url: `dashboard-info`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["dashboardDataCount"],
    }),

    //get dashboard patient count  api
    getPatientInfo: builder.query({
      query: ({ token }) => ({
        url: `dashboard-patient-info`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["totalSessionChart"],
    }),

     //get Schedular count  api
     getSchedularInfo: builder.query({
      query: ({ token }) => ({
        url: `dashboard-schedule-info`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["totalSchedularChart"],
    }),

  }),
});

export const {
  useGetDashboardCountQuery,
  useGetPatientInfoQuery,
  useGetSchedularInfoQuery
} = dashboardApi;
