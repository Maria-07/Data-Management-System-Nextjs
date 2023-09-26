import { api } from "@/Redux/api/apiSlice";

const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.mutation({
      query: (page) => ({
        url: "/patient/list",
        method: "POST",
        body: { page },
      }),
      invalidatesTags: [],
    }),
    getPatientInfo: builder.mutation({
      query: ({ payload }) => ({
        url: "/patient/list",
        method: "POST",
        body: { payload },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGetPatientMutation, useGetPatientInfoMutation } = patientApi;
