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

    //get dashboard count  api
    getTotalSession: builder.query({
      query: ({ token }) => ({
        url: `total-session-chart`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["totalSessionChart"],
    }),

  }),
});

export const {
  useGetDashboardCountQuery,
  useGetTotalSessionQuery
} = dashboardApi;
