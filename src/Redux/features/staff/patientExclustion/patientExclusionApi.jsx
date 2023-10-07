import { api } from "@/Redux/api/apiSlice";

const patientExclusionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //staff patient exclusion get all
    getAllPatientExclusion: builder.query({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/patient/exclusion/get/all`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["PatientExclusion"],
    }),
    //  staff patient exclusion assign
    getAssignedPatientExclusion: builder.query({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/patient/assigned/get/all`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      providesTags: ["PatientExclusion"],
    }),

    //staff patient exclusion save
    addPatientExclusion: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/add/patient/to/assigned`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientExclusion"],
    }),

    // staff patient exclusion delete
    deletePatientExclusion: builder.mutation({
      query: ({ token, payload }) => ({
        url: `inadmin/provider/delete/assigned/patient`,
        method: "POST",
        headers: {
          "content-type": "Application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["PatientExclusion"],
    }),
  }),
});

export const {
  useAddPatientExclusionMutation,
  useDeletePatientExclusionMutation,
  useGetAllPatientExclusionQuery,
  useGetAssignedPatientExclusionQuery,
} = patientExclusionApi;
