import { api } from "@/Redux/api/apiSlice";

export const patientInfoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //handle auth endpoint here
    //get patient info  api
    getPatientInfo: builder.query({
      query: ({ token, id }) => ({
        url: `patient/info/${id}`,
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
      invalidatesTags: ["patientInfoData"],
    }),
    // get race-ethnicity list
    getRaceEthnicity: builder.query({
      query: ({ token, id }) => ({
        url: `patient/race-ethnicity`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          "Authorization": token || null,
        },
      }),
      providesTags: ["reacEthnicity"],
    }),

  }),
});

export const {
  useGetPatientInfoQuery,
  useDeleteCalllogMutation,
  useUpdateCalllogMutation,
  useCreateCalllogMutation,
  useGetRaceEthnicityQuery,
} = patientInfoApi;
