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
          Authorization: token || null,
        },
        //body: JSON.stringify(payload),
      }),
      providesTags: ["calllogData"],
    }),

    // delete Address
    deleteAddress: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/other-address/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // Update call log
    updatePatient: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/update",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
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
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["patientInfoData"],
    }),
    // get race-ethnicity list
    getRaceEthnicity: builder.query({
      query: ({ token }) => ({
        url: `patient/race-ethnicity`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
      }),
      providesTags: ["reacEthnicity"],
    }),

    // delete phone
    deletePhone: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/other-phone/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // delete phone
    deleteEmail: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/other-email/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // delete signature
    deleteSignature: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/signature/delete",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),
    // update phone
    updateSignature: builder.mutation({
      query: ({ token, payload }) => ({
        url: "patient/signature/upload",
        method: "POST",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["calllogData"],
    }),

    // get race-ethnicity list
    getPatientsList: builder.query({
      query: ({ token }) => ({
        url: `patient/list`,
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: token || null,
        },
      }),
      providesTags: ["reacEthnicity"],
    }),
  }),
});

export const {
  useGetPatientInfoQuery,
  useDeleteAddressMutation,
  useUpdatePatientMutation,
  useCreateCalllogMutation,
  useGetRaceEthnicityQuery,
  useDeletePhoneMutation,
  useDeleteEmailMutation,
  useDeleteSignatureMutation,
  useUpdateSignatureMutation,
  useGetPatientsListQuery,
} = patientInfoApi;
