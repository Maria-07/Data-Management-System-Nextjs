import { api } from "@/Redux/api/apiSlice";

export const calllogAuthorizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //get calllog  api
    getCalllog: builder.query({
      query: ({ token, id }) => ({
        url: `patient/call-log/${id}`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["calllogData"],
    }),

    // delete call log
    deleteCalllog: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/call-log/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),
    
    // Update call log
    updateCalllog: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/call-log/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // create call log
    createCalllog: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/call-log/create",
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
  useGetCalllogQuery,
  useDeleteCalllogMutation,
  useUpdateCalllogMutation,
  useCreateCalllogMutation,
} = calllogAuthorizationApi;
