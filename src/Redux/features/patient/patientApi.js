import { api } from "@/Redux/api/apiSlice";

const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.mutation({
      query: (page) => ({
        url: "/inadmin/patient/list",
        method: "POST",
        body: { page },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGetPatientMutation } = patientApi;
